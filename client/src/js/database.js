import { openDB } from 'idb';

// Initialize the database
const initDb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Save data to IndexedDB
export const putDb = async (content) => {
  console.log('PUT to the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Get data from IndexedDB
export const getDb = async () => {
  console.log('GET from the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('content', 'readonly');
  const store = tx.objectStore('content');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result?.value);
  return result?.value;
};

initDb();
