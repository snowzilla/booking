import { createStore } from 'vuex'
import {auth, db} from '@/main'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

import hotels from "./hotels";
import {addDoc, collection} from "firebase/firestore";

const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            console.log(state.user)
        }
    },
    actions: {
        async signup(context, { email, password, name}){
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (response) {
                context.commit('setUser', response.user)
                await addDoc(collection(db, "users"), {
                    id: response.user.uid,
                    name: name
                });
            } else {
                throw new Error('signup failed')
            }
        },

        async login(context, { email, password }){
            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response) {
                context.commit('setUser', response.user)
            } else {
                throw new Error('login failed')
            }
        },

        async logout(context){
            await signOut(auth)
            context.commit('setUser', null)
        }
    },
    modules: {
        hotels
    }
})

export default store