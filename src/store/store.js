import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        user: localStorage.getItem('username') || null,
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        userName(state) {
            return state.user;
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null
        },
        retrieveName(state, user) {
            state.user = user;
        }
    },
    actions: {
        uploadDocument(context, data) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {'content-type': 'multipart/form-data'}
                };
                let formData = new FormData();
                formData.append('documentTitle', data.title);
                formData.append('module_id', data.moduleId);
                formData.append('file', data.file);
                axios.post('cloud/document', formData, config)
                    .then((response) => {
                        resolve(response)
                    }).catch((error) => {
                    reject(error);
                })
            });
        },
        retrieveName(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
            return new Promise((resolve, reject) => {
                axios.get('auth/user')
                    .then(response => {
                        localStorage.setItem('username', response.data.message.fullName);
                        context.commit('retrieveName', response.data.message.fullName);
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        register(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('auth/register', {
                    fullName: data.name,
                    gender: data.gender,
                    email: data.email,
                    password: data.password,
                })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('auth/logout')
                        .then(response => {
                            localStorage.removeItem('access_token');
                            context.commit('destroyToken');
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token');
                            context.commit('destroyToken');
                            reject(error)
                        })
                })
            }
        },
        retrieveModules(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/cloud/modules/' + data.filiere + '/' + data.year + '/' + data.semestre)
                    .then((response) => {
                        resolve(response)
                    }).catch((error) => {
                    reject(error);
                })
            });
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('auth/login', {
                    email: credentials.email,
                    password: credentials.password
                }).then(response => {
                    const token = response.data.token;
                    localStorage.setItem('access_token', token);
                    context.commit('retrieveToken', token);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        searchCourse(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.get('/cloud/search?q=' + credentials.keyWord)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            })
        },
        lastAddedDocument() {
            return new Promise((resolve, reject) => {
                axios.get('/cloud/last/document')
                    .then((response) => {
                        console.log(response);
                        resolve(response)
                    }).catch((error) => {
                    reject(error);
                })
            });
        },
        getAllDocument() {
            return new Promise((resolve, reject) => {
                axios.get("cloud/document")
                    .then(({data}) => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    }
})
