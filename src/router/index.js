import {createRouter, createWebHashHistory} from 'vue-router'
import {getAuth} from "firebase/auth";
import main from "@/views/main";
import apartaments from "@/views/apartaments";
import apartament from "@/views/apartament";
import chat from "@/views/chat";
import chatList from "@/views/chatList";
import likeList from "@/views/likeList";
import profile from "@/views/profile";
import registration from "@/views/registration";
import auth from "@/views/auth";

const routes = [
    {
        path: '/',
        name: 'main',
        component: main
    },
    {
        path: '/apartaments',
        name: 'Apartaments',
        component: apartaments,
    },
    {
        path: '/apartament/:id',
        name: 'apartament',
        component: apartament,
    },
    {
        path: '/chatList',
        name: 'chatList',
        meta: {auth: true},
        component: chatList
    },
    {
        path: '/chat',
        name: 'chat',
        component: chat,
    },
    {
        path: '/likeList',
        name: 'likeList',
        meta: {auth: true},
        component: likeList,
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {auth: true},
        component: profile,
    },
    {
        path: '/registration',
        name: 'registration',
        component: registration,
    },
    {
        path: '/auth',
        name: 'auth',
        component: auth,
    },

]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    let currentUser = getAuth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)

    if (localStorage.vuex){
        currentUser = JSON.parse(localStorage.vuex).user
    }

    if (requireAuth && !currentUser) {
        next('/auth')
    } else {
        next()
    }
})

export default router
