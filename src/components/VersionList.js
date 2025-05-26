/* global BigInt */
import React, { useState, useEffect } from 'react';
import VersionCard from './VersionCard.js';
import './VersionList.css';

function VersionList({ refreshTrigger }) {
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const response = await fetch("http://localhost:8000/inventories/", {
                    credentials: "include",
                });
                if (!response.ok) {
                    let errorMessage = `Błąd sieci: ${response.status} - ${response.statusText}`;
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.detail || JSON.stringify(errorData);
                    } catch (err) {
                        console.error("Błąd podczas pobierania inwentarzy:", err);
                    }
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setInventories(data.reverse());

            } catch (err) {
                console.error("Błąd podczas pobierania inwentarzy:", err);
                setInventories([]);
            }
        };

        fetchInventories();
    }, [refreshTrigger]);

    return (
        <div className='version-list'>
            {inventories.map(inventory => (
                <VersionCard key={inventory.id} inventory={inventory} />
            ))}
        </div>
    );
}

export default VersionList;