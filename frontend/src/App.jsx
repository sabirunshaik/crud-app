import { useState, useEffect } from "react";
import axios from "axios";
import Looader from "./components/Looader";
import "./App.css";
import "./components/popup/popup.css";
import PopUp from "./components/popup/PopUp";
function App() {
  const [loader, setLoader] = useState(true);

  const [popup, setPopup] = useState(false);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    setLoader(true);
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // showing popup box
  const handleClick = () => {
    setPopup(true);
  };

  // handleLogout
  const handleLogout = () => {
    setPopup(false);
    alert('SUCCESFULLY LOGGEDOUT')
  };
  // handleCancel
  const handleCancel = () => {
    setPopup(false);
    
  };
  // setting loader false
  setTimeout(() => {
    setLoader(false);
  }, 1000);

  const generateId = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };

  const handleCreateItem = async () => {
    try {
      const newItem = { id: generateId(), name: itemName };
      const response = await axios.post("http://localhost:5000/api", newItem);
      setItems([...items, response.data]);
      setItemName("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setEditName(item.name);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${editItem.id}`,
        { name: editName }
      );
      setItems(
        items.map((item) => (item.id === editItem.id ? response.data : item))
      );
      setEditItem(null);
      setEditName("");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {popup ? (
        <div className="popUpContainer">
          <div className="box">
            <p>Are You Sure?</p>
            <div className="Buttuns">
              <button onClick={handleCancel} className="cancelBtn">
                Cancel
              </button>
              <button onClick={handleLogout} className="yesBtn">
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button onClick={handleClick} className="popup-btn">
        log out
      </button>
      {loader ? (
        <Looader />
      ) : (
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-semibold mb-4">CRUD App</h1>
          <div className="mb-4 w-full flex flex-wrap items-center gap-2 justify-start">
            <input
              type="text"
              className="w-full md:w-fit px-3 py-2 border rounded"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleCreateItem}
            >
              Add Item
            </button>
          </div>
          <ul>
            {items.map((item, i) => (
              <li
                key={i + 1}
                className="flex justify-between items-center border-b py-2"
              >
                {editItem === item ? (
                  <input
                    type="text"
                    className=" px-3 py-2 border rounded"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    key={`edit-${item.id}`}
                  />
                ) : (
                  <span>{item.name}</span>
                )}
                <div>
                  {editItem === item ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={handleUpdateItem}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
