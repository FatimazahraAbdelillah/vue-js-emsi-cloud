import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios';
import VueSession from 'vue-session'
import 'bootstrap'
import Vuelidate from 'vuelidate'
import './assets/css/main.css'
import './assets/css/style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';



Vue.use(VueSession);
Vue.use(Loading);

Vue.use(Vuelidate);

Vue.config.productionTip = false;
axios.defaults.baseURL = "https://emsi-api.herokuapp.com/api/";

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next()
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


