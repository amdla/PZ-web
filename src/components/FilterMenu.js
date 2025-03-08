import './FilterMenu.css'
import React, { useEffect, useRef } from "react";
import FilterSort from './FilterSort';
import FilterSearch from './FilterSearch';


function FilterMenu({ isOpen }) {
  const menuRef = useRef(null);

  // to z chata możliwe że do poprawy
  useEffect(() => {
    if (isOpen && menuRef.current) {
      // 1. Reset to the default right alignment
      menuRef.current.style.right = "0px";
      menuRef.current.style.left = "auto";

      // 2. Measure the menu and the closest table container
      const menuRect = menuRef.current.getBoundingClientRect();
      const container = menuRef.current.closest(".table-container");
      if (!container) return; // safety check
      const containerRect = container.getBoundingClientRect();

      // 3. If the menu's left edge is outside the container, align left
      if (menuRect.left < containerRect.left) {
        menuRef.current.style.left = "0px";  // anchor left edge of container
        menuRef.current.style.right = "auto";
      }
    }
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="filter-menu" ref={menuRef}>

      <FilterSort/>

      <hr></hr>

      <FilterSearch/>

    </div>
  );
}

export default FilterMenu;