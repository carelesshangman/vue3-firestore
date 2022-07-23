<template>
  <form>
    <h1>Create Event</h1>
    <strong>ID: </strong>{{id}}<br>
    <strong>Name: </strong><input type="text" v-model="name" placeholder="Write the name of event" required><br>
    <strong>Type: </strong><input type="text" v-model="type" placeholder="Write the type of event" required><br>
    <strong>Description: </strong><input type="text" v-model="description" placeholder="Write a description"
      required><br>
    <strong>Priority: </strong><input type="number" v-model="priority" max="10" min="0" placeholder="0-10" required><br>
    <strong>Relations: </strong><input type="text" v-model="relations" placeholder="Write IDs of related events" required><br>
  <button v-on:click="putData()">Submit event</button><br>
  <strong>{</strong><strong v-if="id!==''">"id":</strong> {{ id }}<strong v-if="name!==''">, "name":</strong> {{ name }}<strong v-if="type!==''">, "type":</strong> {{ type }}<strong v-if="description!==''">,
    "description":</strong> {{ description }}<strong v-if="priority!==''">, "priority":</strong> {{ priority }}<strong v-if="relations!==null">, "relations":[</strong>{{relations}}<strong v-if="relations!==null">]</strong><strong>}</strong>
  </form>
  <form>
    <h1>Delete Event</h1>
      <strong>ID: </strong><input type="number" v-model="Did" placeholder="Input ID to delete event" required><br>
    <button>Delete event</button><br>
  </form>
</template>


<script>
import { firebaseConfig } from './firebase-config';
import 'firebase/firestore';
import firebase from 'firebase/app';

export default {
  name: 'App',
  data() {
    return {
      id: '',
      name: '',
      type: '',
      description: '',
      priority: '',
      relations: '',
    }
  },
  tmpName: '',
  maxId: '',
  allEventsArr: [],
  methods: {
    initFirebase() {
      firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
      console.log("base is up");
    },
    getData() {
      this.db.collection('ekipa7').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      });
    },
    putData() {
      this.db.collection('ekipa7').add({
        id: this.id,
        name: this.name,
        type: this.type,
        description: this.description,
        priority: this.priority,
        relations: this.relations,
      });
      this.getHighestId();
    },
    checkIfExist(id){
      this.db.collection('ekipa7').where('id', '==', id).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      });
    },
    getHighestId() {
      this.db.collection('ekipa7').orderBy('id', 'desc').limit(1).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          if(doc.data()!==null){
            this.id = parseInt(doc.data().id) + 1;
          }
          else{
            this.id = 0;
          }
        });
      });
    },
    async getAllIDs() {
      let ids = [];
      await this.db.collection('ekipa7').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          ids.push(doc.data().id);
        });
      });
      console.log(ids);
      return ids;
    },
    getEventById(id) {
      this.db.collection('ekipa7').where('id', '==', id).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          this.relations = doc.data().id;
          this.tmpName = doc.data().name;
        });
      });
    },
    editEvent(id) {
      this.db.collection('ekipa7').doc(id).update({
        name: this.name,
        type: this.type,
        description: this.description,
        priority: this.priority,
        relations: this.relations,
      });
    },
  },
  mounted() {
    this.initFirebase();
    this.getHighestId();
    this.getAllIDs();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
