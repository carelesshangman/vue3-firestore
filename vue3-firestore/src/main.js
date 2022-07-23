import { createApp } from 'vue';
import App from './App.vue';
// import { firebaseConfig } from './firebase-config';
// import 'firebase/firestore';
// import firebase from 'firebase/app';

// firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();

// db.collection('ekipa7').get().then(r => {
//     r.docs.map(doc => {
//         console.log(doc.data());
//     });
// });

// let event = {

//     name: 'test',
// }
// db.collection('ekipa7').add(event).then(r => {
//     console.log(r);
// });  
createApp(App).mount('#app');
