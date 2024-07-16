import { useState, useEffect } from 'react'
import './styles.css'

export default function JournalApp() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState(null)
    const [journals, setJournals] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState('');


    //handle Add new Journal entry()
    function handleAddJournal() {

        if (!title.trim() || !content.trim()) {
            alert('Please enter a title and content.');
            return;
        }

        setJournals(currentJournals => {
            // console.log(currentJournals)
            return [
                ...currentJournals, {
                    id: crypto.randomUUID(),
                    title,
                    content,
                    category,
                    currentDateTime
                },
            ]
        })

    }

    //function to delete journal enteries
    function handleEntryDel(id) {
        setJournals(currentJournals => {
            return currentJournals.filter(item => item.id !== id)
        })
    }


    //function to filter journal entries based on selected categories
    function handleSort(e) {
        const category = e.target.value
        setJournals(currentJournals => {
            return currentJournals.reduce(item => item.category !== category)
        })
    }

    //get current date and time on compnent mount
    useEffect(() => {
        const now = new Date();
        setCurrentDateTime(now.toLocaleString());
    }, []);


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
                type="textarea"
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


        {journals && journals.length < 2 ? <h1>My Journal_</h1> : <div className="list-header"><h1>My Journals_</h1>
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
                                <button onClick={() => handleEntryDel(item.id)}>Delete</button>
                                <button>Edit</button>
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

// todos  unable to implement edit item functionality