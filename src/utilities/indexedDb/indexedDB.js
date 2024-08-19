// indexedDB.js
import { openDB } from "idb";

const DB_NAME = "JournalAppDB";
const STORE_NAME = "entriesStore";
const DB_VERSION = 1;

export const initDB = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
    console.log(db, "successful");
    return db;
  } catch (error) {
    console.log("caught error", error);
  }
};

export const getAllItems = async (db) => {
  return await db
    .getAll(STORE_NAME)
    .then( console.log("fetch items from db: ", STORE_NAME)).catch(e => console.log(e));
  // 
};

export const addItem = async (db, item) => {
  await db.add(STORE_NAME, item);
  console.log("Added item: ", item);
};

export const updateItem = async (db, item) => {
  await db.put(STORE_NAME, item);
  console.log("updated item: ", item);
};

export const deleteItem = async (db, id) => {
  await db.delete(STORE_NAME, id);
  console.log("Deleted item with id: ", id);
};
