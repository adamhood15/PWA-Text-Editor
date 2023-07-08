// import { openDB } from 'idb';

// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
//       console.log('jate database created');
//     },
//   });

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (id, content) => {
//   console.log('Put to the jate');
//   const jateDb = await openDB('jate', 1);
//   const tx = jateDb.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   const request = store.put({ id: id, jate: content });
//   const result = await request;
//   console.log('Data saved to the database', result);  
//   console.error('putDb not implemented')
// };

// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => {
//   console.log('GET all from the database');
//   const jateDb = await openDB('jate', 1);
//   const tx = jateDb.transaction('jate', 'readonly');
//   const store = tx.objectStore('jate');
//   const request = store.getAll();
//   const result = await request;
//   console.log('result.value', result);
//   console.error('getDb not implemented');
//   return result;
// }

// initdb();

import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;

    if (result) {
        console.log('data retrieved from the database', result.value);
    } else {
        console.log('data not found in the database');
    }
    return result?.value;
};

initdb();