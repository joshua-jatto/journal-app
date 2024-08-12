import { useState, useEffect } from "react";
import {
  initDB,
  getAllItems,
  addItem, 
  updateItem,
  deleteItem,
} from "../../utilities/indexedDb/indexedDB";
import Navbar from "./Navbar";
import { useAuth } from "../context/auth-context";

//NOTE: ...item refer to data interacting with database
export default function JournalApp() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(crypto.randomUUID());

  const [items, setItems] = useState([]);
  const [journals, setJournals] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const {userName, currentUser} = useAuth()

  const [db, setDb] = useState(null);

  useEffect(() => {
    const init = async () => {
      const db = await initDB();
      setDb(db);
      const storedItems = await getAllItems(db);
      setItems(storedItems);
    };

    init(); //initialize db for sync
    setJournals(items); //sets initial items to journals with items from db via getAllItems
  }, []);

  const handleAddItem = async (item) => {
    await addItem(db, item);
    setItems((prevItems) => [...prevItems, item]);
  };

  // const handleUpdateItem = async (updatedItem) => {
  //     await updateItem(db, updatedItem);
  //     setItems((prevItems) =>
  //         prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  //     );
  //     console.log('updated', updateItem)
  // };

  const handleDeleteItem = async (id) => {
    await deleteItem(db, id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    console.log("deleted item at", id);
  };

  const newItem = {
    id,
    title,
    content,
    category,
    currentDateTime,
  };

  //handle Add new Journal entry()
  function handleAddJournal() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content.");
      return;
    }

    setJournals((currentJournals) => {
      return [...currentJournals, newItem];
    });
    handleAddItem(newItem);

    setTitle("");
    setContent("");
    setId(crypto.randomUUID());
  }

  function handleDelEntry(id) {
    // delete journal enteries in ui
    setJournals((currentJournals) => {
      return currentJournals.filter((item) => item.id !== id);
    });
    handleDeleteItem(id); // delete journal enteries in db
  }

  //function to repopulate journal entry fields and edit items
  function handleEditItem(getCurrentId) {
    let cpyJournal = [...journals];
    cpyJournal.map((item) => {
      if (item.id === getCurrentId) {
        setTitle(item.title);
        setContent(item.content);
        setCategory(item.category);
      }
      // handleUpdateItem(cpyJournal)
      return cpyJournal;
    });
  }

  //assigns current locale time to each journal entry
  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString());
  }, [handleAddItem]);

  return (
    <div className="journal-wrapper">
      <Navbar displayName={userName}/>
      <div>
        <h4>Hello👋{currentUser?.displayName}...begin new journey</h4>
        {/* {console.log(displayName)} */}
      </div>

      <div className="form">
        <input
          type="text"
          name="title"
          placeholder="New Jourey title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="textfield"
          name="content"
          id="textarea"
          placeholder="Enter todays Jourey..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <select
          name="category"
          id="category"
          onClick={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="travel">Travel</option>
        </select>

        <button className="form-btn" onClick={() => handleAddJournal()}>
          Add entry
        </button>
      </div>

      {journals && journals.length < 2 ? (
        <h3>My Journal_</h3>
      ) : (
        <div className="list-header">

         <h3>MyJournal myJourney
         <span style={{ color: "green" }}>
              {journals && journals.length}
              📝
            </span>
         </h3>
            
           
          <select onChange={(e) => handleSort(e)}>
            <option value="default">sort by category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="travel">Travel</option>
          </select>{" "}
        </div>
      )}

      <ul className="journals">
        {journals && journals.length > 0 ? (
          journals.map((item) => {
            return (
              <li key={item.id}>
                <span className="journal-item">
                  <span>
                    <h4><strong>Title:</strong>{item.title}</h4>
                    <h5><strong>Category:</strong>{item.category}</h5>
                    <p><strong>Content:</strong>{item.content}</p>
                    <p><strong>Date:</strong>{item.currentDateTime}</p>
                    {/* <p>Id:{item.id}</p> */}
                  </span>

                  <span className="journal-item-options">
                    <button onClick={() => handleDelEntry(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEditItem(item.id)}>
                      Edit
                    </button>
                  </span>
                </span>
              </li>
            );
          })
        ) : (
          <span className="empty">
            <h4>Empty📪 Add a new journal entry</h4>
          </span>
        )}
      </ul>
    </div>
  );
}

// todos  unable to implement sort item based on category functionality
