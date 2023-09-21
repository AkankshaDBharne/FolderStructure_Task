import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import AddFolder from './AddFolder';
import initialData from '../utils/data';

function Structure() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    setData(initialData);
  }, []);

  const handleEditItem = (folderName, itemName, newItemName) => {
    const updatedData = data.map((item) => {
      if (item.name === folderName) {
        const updatedContent = item.content.map((contentItem) => {
          if (contentItem === itemName) {
            return newItemName;
          }
          return contentItem;
        });
        return { ...item, content: updatedContent };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleDeleteItem = (folderName, itemName) => {
    const updatedData = data.map((item) => {
      if (item.name === folderName) {
        const updatedContent = item.content.filter((contentItem) => contentItem !== itemName);
        return { ...item, content: updatedContent };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleAddFolder = (parentFolderName, newFolderName) => {
    const newFolder = {
      name: newFolderName, 
      content: [], 
    };
  
    const updatedData = data.map((item) => {
      if (item.name === parentFolderName) {
        return {
          ...item,
          content: [...item.content, newFolder],
        };
      }
      return item;
    });
  
    setData(updatedData);
  };
  
 

  const handleAddFile = (folderName, newFileName) => {
    const updatedData = data.map((item) => {
      if (item.name === folderName) {
        return { ...item, content: [...item.content, newFileName] };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleAddRootFolder = (newFolderName) => {
    const newFolder = {
      name: newFolderName,
      content: [],
    };
    setData([...data, newFolder]);
  };


  return (
    <div>
      <h1 className='heading'>Folder Structure</h1>
        <div className="top-bar">
            <div className="top-bar-buttons">
            <AddFolder onAddItem={handleAddRootFolder} placeholder="Add Folder" />
            </div>
        </div>
        {data.map((item) => (
          <Folder
            key={item.name}
            data={item}
            onEditItem={handleEditItem}
            onDelete={handleDeleteItem}
            onAddItem={handleAddFolder}
            onAddFile={handleAddFile}
            depth={0}
          />
        ))}
      
    </div>
  );
}

export default Structure;
