import React, { useState } from 'react';

function Folder({  data, onEditItem, onDelete, onAddItem, onAddFile, depth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = (itemName) => {
    const newName = prompt('Enter the new name:', itemName);
    if (newName !== null) {
      onEditItem(data.name, itemName, newName);
    }
  };

  const handleDeleteClick = (itemName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);
    if (confirmDelete) {
      onDelete(data.name, itemName);
    }
  };

  const handleAddFolder = () => {
    if (newItemName.trim() !== '') {
      onAddItem(data.name, newItemName);
      setNewItemName('');
      setIsAddingFolder(false);
    }
  };

  const handleAddFile = () => {
    if (newFileName.trim() !== '') {
      onAddFile(data.name, newFileName);
      setNewFileName('');
      setIsAddingFile(false);
    }
  };

  return (
    <div className='folder'>
      <div onClick={toggleFolder}>
        {isOpen ? '📂 ' : '📁 '} {data.name}
      </div>
      <div style={{ marginLeft: `${(depth + 1) * 20}px` }}>
        {isOpen && (
          <div>
            {data.content.map((item, index) => (
              <div key={index}>
                {typeof item === 'object' ? (
                  <Folder
                    data={item}
                    onEditItem={onEditItem}
                    onDelete={onDelete}
                    onAddItem={onAddItem}
                    onAddFile={onAddFile}
                    depth={depth + 1}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' ,width:'400px'}}>
                    <span role="img" aria-label="file-icon">
                        📄
                    </span>
                    <span style={{ flex: 1 }}>{item}</span>
                          <div style={{ display: 'flex', alignItems: 'center',marginLeft: '50px', marginRight: '5px' }}>  
                          <div className='folder-btn'>
                            <button style={{  }} onClick={() => handleEditClick(item)}>Edit</button>
                            <button onClick={() => handleDeleteClick(item)}>Delete</button>
                          </div>
                        </div>
                  </div>
                )}
              </div>
            ))}
            {isAddingFolder && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Enter folder name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <button style={{ marginLeft: '10px' }} onClick={handleAddFolder}>Add Folder</button>
              </div>
            )}
            {isAddingFile && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Enter file name"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                />
                <button style={{ marginLeft: '10px' }} onClick={handleAddFile}>Add File</button>
              </div>
            )}
            {!isAddingFolder && (
              <button style={{ marginLeft: '10px' }} onClick={() => setIsAddingFolder(true)}>Add Folder</button>
            )}
            {!isAddingFile && (
              <button style={{ marginLeft: '10px' }} onClick={() => setIsAddingFile(true)}>Add File</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Folder;
