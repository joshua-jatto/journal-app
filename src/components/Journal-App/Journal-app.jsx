import { useState, useEffect } from 'react'
import { initDB, getAllItems, addItem, updateItem, deleteItem } from '../indexedDb/indexedDB';
import './styles.css'

export default function JournalApp() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(null);

    const [items, setItems] = useState([]); //
    const [journals, setJournals] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState('');

    const [db, setDb] = useState(null);

    // ...item refer to data interacting with database
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
    //   await updateItem(db, updatedItem);
    //   setItems((prevItems) =>
    //     prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    //   );
    //   console.log(updateItem)
    // };

    const handleDeleteItem = async (id) => {
        await deleteItem(db, id);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log('deleted item at', id)
    };


    //handle Add new Journal entry()
    function handleAddJournal() {

        if (!title.trim() || !content.trim()) {
            alert('Please enter a title and content.');
            return;
        };

        setJournals(currentJournals => {

            const newItem = [
                ...currentJournals, {
                    id: crypto.randomUUID(),
                    title,
                    content,
                    category,
                    currentDateTime
                },
            ];

            //verbose fix this!
            handleAddItem({
                id: crypto.randomUUID(),
                title,
                content,
                category,
                currentDateTime
            })
            return newItem

        }),
            setTitle('')
        setContent('')
    };

    function handleDelEntry(id) {   // delete journal enteries in ui
        setJournals(currentJournals => {
            return currentJournals.filter(item => item.id !== id)
        })
        handleDeleteItem(id) // delete journal enteries in db
    }

    // #todo
    //function to filter journal entries based on selected categories
    // function handleSort(e) {
    //     const category = e.target.value
    //     setJournals(currentJournals => {
    //         return currentJournals.reduce(item => item.category !== category)
    //     })
    // }

    //function to repopulate journal entry fields and edit items
    function handleEditItem(getCurrentId) {
        let cpyJournal = [...journals]
        cpyJournal.map(item => {
            if (item.id === getCurrentId) {
                setTitle(item.title)
                setContent(item.content)
                setCategory(item.category)
            }
            return cpyJournal
        });

    };

    //assigns current locale time to each journal entry
    useEffect(() => {
        const now = new Date();
        setCurrentDateTime(now.toLocaleString());
    }, [handleAddItem]);


    return <div className="journal-wrapper">
        <header>
            <h1>New Journal_</h1>
        </header>

        <div className='form'>
            <input
                type="text"
                name='title'
                placeholder='New Jourey title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}

            />
            <input
                type="textfield"
                name='content'
                id='textarea'
                placeholder='Enter todays Jourey...'
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


            <button className='form-btn'
                onClick={() => handleAddJournal()}>Add entry</button>
        </div>


        {journals && journals.length < 2 ? <h1>My Journal_</h1> : <div className="list-header"><h1>My Journals_<span style={{ color: 'green' }}>{journals && journals.length}</span></h1>
            <select onChange={(e) => handleSort(e)}>
                <option value="default">sort by category</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="travel">Travel</option>
            </select> </div>}


        <ul className='journals'>
            {journals && journals.length > 0 ?


                journals.map(item => {
                    return <li key={item.id}>
                        <span className="journal-item">
                            <span>
                                <h4>Title:{item.title}</h4>
                                <h5>Category:{item.category}</h5>
                                <p>Content:{item.content}</p>
                                <p>Date:{item.currentDateTime}</p>
                            </span>

                            <span className='journal-item-options'>
                                <button onClick={() => handleDelEntry(item.id)}>Delete</button>
                                <button onClick={() => handleEditItem(item.id)}>Edit</button>
                            </span>
                        </span>

                    </li>
                })


                : <span className='empty'>
                    <h4>Empty:( Add a new journal entry</h4>
                </span>


            }
        </ul>
    </div>


}

// todos  unable to implement sort item based on category functionality
