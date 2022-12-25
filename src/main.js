import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyACGpiwxiuOsHbTQY_afkfVKg_pHQ_ab5U",
    authDomain: "bookin-352fc.firebaseapp.com",
    projectId: "bookin-352fc",
    storageBucket: "bookin-352fc.appspot.com",
    messagingSenderId: "500749882433",
    appId: "1:500749882433:web:d3b209eda5db9bf4f822c0"
};


const app = initializeApp(config)
const db = getFirestore(app)

const auth = getAuth()

export {auth, db}

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')


