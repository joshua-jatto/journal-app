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
import Item from "./item";

//NOTE: ...item refer to data interacting with database
export default function JournalApp() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(crypto.randomUUID());

  const [items, setItems] = useState([]);
  const [journals, setJournals] = useState();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const {currentUser} = useAuth();

  const [db, setDb] = useState();

  useEffect(() => {
    const init = async () => {
      const data = await initDB();
      setDb(data);
      const storedItems = await getAllItems(data);
      setItems(storedItems);
      setJournals(items);
    };

    init(); //initialize db for sync
  }, []);

  const newItem = {
    id,
    title,
    content,
    category,
    currentDateTime,
  };

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
      <Navbar displayName={currentUser?.displayName} />
      <div>
        <h4>Hello👋 {currentUser?.displayName}... Enter new journey</h4>
      </div>

      <div className="form">
        <input
          type="text"
          name="title"
          placeholder="New jourey title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          name="content"
          id="textarea"
          placeholder="Enter today's Jourey..."
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
        <h3>My Journal</h3>
      ) : (
        <div className="list-header">
          <h4>
          📝 Entries: 
            <span style={{ color: "green" }}>
              {journals && journals.length}
            </span>
          </h4>
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
          journals.map((item) => (
            <Item
              item={item}
              handleDelEntry={handleDelEntry}
              handleEditItem={handleEditItem}
              key={item.id}
            />
          ))
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
