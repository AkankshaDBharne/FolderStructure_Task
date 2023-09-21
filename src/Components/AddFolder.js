import React, { useState } from 'react';

function AddFolder({ onAddItem, placeholder }) {
    const [newItemName, setNewItemName] = useState('');
  
    const handleAddItem = () => {
      if (newItemName.trim() !== '') {
        onAddItem(newItemName);
        setNewItemName('');
      }
    };
  
    return (
      <div className="add-item-form">
        <input
          type="text"
          placeholder={placeholder}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>{placeholder}</button>
      </div>
    );
  }
  
  export default AddFolder;
  