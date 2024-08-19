import React from 'react'

export default function Item({item, handleDelEntry, handleEditItem}) {
  return (
    <li key={item.id}>
                <span className="journal-item">
                  <span>
                    <h4>
                      <strong>Title:</strong>
                      {item.title}
                    </h4>
                    <h5>
                      <strong>Category:</strong>
                      {item.category}
                    </h5>
                    <p>
                      <strong>Content:</strong>
                      {item.content}
                    </p>
                    <p>
                      <strong>Date:</strong>
                      {item.currentDateTime}
                    </p>
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
  )
}

// export default Item;