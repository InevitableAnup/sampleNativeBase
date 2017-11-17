import * as firebase from 'firebase';


const firebaseConfig ={
    apiKey: "AIzaSyC1ikrKiKxmKJUFpAp3aiFOtJ46rSbA0Pw",
    authDomain: "trainedin-c2c10.firebaseapp.com",
    databaseURL: "https://trainedin-c2c10.firebaseio.com",
    projectId: "trainedin-c2c10",
    storageBucket: "trainedin-c2c10.appspot.com",
    messagingSenderId: "919573787446"
};

const firbaseApp = firebase.initializeApp(firebaseConfig);

export const base = firbaseApp.database();