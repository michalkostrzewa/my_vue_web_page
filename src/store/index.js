import { createStore } from "vuex";
import { auth, userCollection } from "@/includes/firebase";

export default createStore({
    state: {
        authModalShow: false,
        userLoggedIn: false,
    },
    mutations: {
        toggleAuthModal(state) {
            state.authModalShow = !state.authModalShow;
        },
        loggedIn(state) {
            state.userLoggedIn = true;
        },
        loggedOut(state) {
            state.userLoggedIn = false;
        }
    },
    actions: {
        async login({ commit }, payload) {
            await auth.signInWithEmailAndPassword(payload.email, payload.password);
            commit("loggedIn");
        },
        async register({ commit }, payload) {
            const userCred = await auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password
            );
            await userCollection.doc(userCred.user.uid).set({
                name: payload.name,
                email: payload.email,
                age: payload.age,
                country: payload.country,
            });

            await userCred.user.updateProfile({ displayname: payload.name })

            commit("loggedIn");
        },
        init_login({ commit }) {
            const user = auth.currentUser;
            if (user) {
                commit('loggedIn');
            }
        },
        async signout({ commit }) {
            await auth.signOut();
            commit("loggedOut");
        }
    },
    modules: {},
});
