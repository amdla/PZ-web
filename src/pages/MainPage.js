/* global BigInt */
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import "./MainPage.css";
import Header from "../components/Header";
import VersionList from "../components/VersionList";
import { getCookie } from "../utils/utils";

function MainPage() {
  const fileInputRef = useRef(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadSuccess = () => {
    setRefreshTrigger(prevTrigger => prevTrigger + 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array", cellDates: true });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        const formattedData = formatData(jsonData);
        sendDataToBackend(formattedData, handleUploadSuccess);
      } catch (error) {
        console.error("Błąd podczas przetwarzania pliku Excel:", error);
        alert(`Błąd podczas przetwarzania pliku: ${error.message}`);
      } finally {
        event.target.value = null;
      }
    };

    reader.onerror = (error) => {
      console.error("Błąd FileReader:", error);
      alert("Błąd przetwarzania pliku.");
      event.target.value = null;
    };

    reader.readAsArrayBuffer(file);
  };

  // Funkcja formatData z nową logiką błędów i obsługą lastInventoryRoom
  const formatData = (data) => {
    if (data.length < 2) {
      throw new Error(
        "Plik Excel nie zawiera wystarczającej ilości danych (nagłówki + przynajmniej jeden wiersz)."
      );
    }
    const headers = data[0].map((h) => (h || "").toString().trim());
    const rows = data.slice(1);

    const findHeaderIndex = (searchTerms) => {
      for (const term of searchTerms) {
        const index = headers.findIndex(
          (h) => (h || "").toLowerCase() === term.toLowerCase()
        );
        if (index !== -1) return index;
      }
      return -1;
    };

    const indices = {
      department: findHeaderIndex(["dział gospodarczy"]),
      asset_group: findHeaderIndex(["grupa aktywów trw."]),
      category: findHeaderIndex(["grupa rodzajowa"]),
      inventory_number: findHeaderIndex(["numer inwentarzowy"]),
      asset_component: findHeaderIndex(["składnik aktyw. trw."]),
      sub_number: findHeaderIndex(["podnumer"]),
      acquisition_date: findHeaderIndex(["data pierw.przychodu"]),
      asset_description: findHeaderIndex(["oznaczenie aktywów trwałych"]),
      quantity: findHeaderIndex(["ilość", "ilosc"]),
      initial_value: findHeaderIndex(["WartPocz", "wartosc"]),
      lastInventoryRoom: findHeaderIndex(["pomieszczenie"]),
      currentRoom: findHeaderIndex(["poprzednie pomieszczenie"]),
    };

    const criticalHeaders = {
      asset_group: "Grupa aktywów trw.",
      asset_component: "Składnik aktyw. trw.",
      sub_number: "Podnumer",
      acquisition_date: "Data pierw.przychodu",
      asset_description: "Oznaczenie aktywów trwałych",
      quantity: "Ilość",
      initial_value: "WartPocz",
      lastInventoryRoom: "pomieszczenie",
    };

    for (const key in criticalHeaders) {
      if (indices[key] === -1) {
        throw new Error(
          `Nie można znaleźć wymaganej kolumny nagłówka: '${criticalHeaders[key]}' (dla pola '${key}') w pliku Excel.`
        );
      }
    }

    return rows.map((row) => {
      const item = {};

      for (const key in indices) {
        let excelValue = null;
        let processedValue = null;

        if (indices[key] !== -1) {
          excelValue = row[indices[key]];
        } else {
          item[key] = "";
          continue;
        }

        if (
          excelValue !== null &&
          excelValue !== undefined &&
          excelValue !== ""
        ) {
          try {
            processedValue = excelValue;
            if (
              key === "department" ||
              key === "asset_group" ||
              key === "sub_number" ||
              key === "quantity"
            ) {
              processedValue = parseInt(excelValue, 10);
              if (isNaN(processedValue))
                throw new Error("Wartość nie jest poprawną liczbą całkowitą.");
            } else if (key === "asset_component") {
              processedValue = BigInt(excelValue).toString();
            } else if (key === "initial_value") {
              let strValue = excelValue.toString();
              strValue = strValue.replace(/zł|\s/gi, "");
              strValue = strValue.replace(",", ".");
              processedValue = parseFloat(strValue);
              if (isNaN(processedValue))
                throw new Error(
                  "Wartość nie jest poprawną liczbą (np. walutą)."
                );
            } else if (key === "acquisition_date") {
              if (excelValue instanceof Date) {
                processedValue = excelValue.toISOString().split("T")[0];
              } else {
                const strValue = excelValue.toString();
                const dateMatch = strValue.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
                if (dateMatch) {
                  const day = dateMatch[1];
                  const month = dateMatch[2];
                  const year = dateMatch[3];
                  processedValue = `${year}-${month}-${day}`;
                } else {
                  throw new Error(
                    `Nie rozpoznano formatu daty (oczekiwano DD.MM.YYYY) dla wartości "${strValue}".`
                  );
                }
              }
            } else {
              processedValue = excelValue.toString().trim();
            }
            item[key] = processedValue;
          } catch (convError) {
            throw new Error(
              `Błąd konwersji danych dla pola '${key}' Szczegóły: ${convError.message}`
            );
          }
        } else {
          if (key in criticalHeaders) {
            throw new Error(
              `Brak wartości dla wymaganego pola '${criticalHeaders[key]}' (klucz: '${key}')`
            );
          }
          item[key] = "s";
        }
      }
      return item;
    });
  };

  // Funkcja wysyłająca dane do backendu
  const sendDataToBackend = async (itemsData, onSuccess) => {
    const csrftoken = getCookie("csrftoken");
    const inventoryName = `SAP Upload ${
      new Date().toISOString().split("T")[0]
    }`;
    const currentDate = new Date().toISOString().split("T")[0];
    // Tworzenie nowego inwentarza
    try {
      const inventoryResponse = await fetch(
        "http://localhost:8000/inventories/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            name: inventoryName,
            date: currentDate,
          }),
          credentials: "include",
        }
      );

      if (!inventoryResponse.ok) {
        let errorData = {
          detail: `Błąd serwera przy tworzeniu inwentarza: ${inventoryResponse.statusText}`,
        };
        try {
          errorData = await inventoryResponse.json();
        } catch (e) {
          console.error("Odpowiedź serwera (inwentarz) nie jest JSONem:", e);
        }
        const errorMessage =
          errorData.detail ||
          JSON.stringify(errorData) ||
          inventoryResponse.statusText;
        throw new Error(
          `Błąd backendu (tworzenie inwentarza): ${inventoryResponse.status} - ${errorMessage}`
        );
      }

      const newInventory = await inventoryResponse.json();
      const newInventoryId = newInventory.id;

      // Każdy wiersz musi mieć inventoryId
      const itemsWithInventoryId = itemsData.map((item) => ({
        ...item,
        inventory: newInventoryId,
        //currentRoom: "",
        scanned: false,
      }));

      console.log(
        `Krok 2: Wysyłanie ${itemsWithInventoryId.length} przedmiotów do inwentarza ID: ${newInventoryId}...`
      );
      const itemsResponse = await fetch("http://localhost:8000/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(itemsWithInventoryId),
        credentials: "include",
      });

      if (!itemsResponse.ok) {
        let errorData = {
          detail: `Błąd serwera przy tworzeniu przedmiotów: ${itemsResponse.statusText}`,
        };
        try {
          errorData = await itemsResponse.json();
        } catch (e) {
          console.error("Odpowiedź serwera (przedmioty) nie jest JSONem:", e);
        }
        const errorMessage =
          errorData.detail ||
          JSON.stringify(errorData) ||
          itemsResponse.statusText;
        throw new Error(
          `Błąd backendu (tworzenie przedmiotów): ${itemsResponse.status} - ${errorMessage}`
        );
      }

      const createdItems = await itemsResponse.json();
      alert(
        `Import zakończony pomyślnie! Utworzono inwentarz "${inventoryName}" z ${createdItems.length} przedmiotami.`
      );
      onSuccess();
    } catch (error) {
      console.error("Błąd podczas wysyłania danych do backendu:", error);
      alert(`Wysyłanie nieudane: ${error.message}`);
    }
  };

  return (
    <div className="page">
      <Header />
      <div className="page-body">
        <VersionList refreshTrigger={refreshTrigger}/>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".xlsx, .xls"
        />
        <button className="black-button" onClick={handleUploadClick}>
          Wczytaj plik SAP
        </button>
      </div>
    </div>
  );
}

export default MainPage;
