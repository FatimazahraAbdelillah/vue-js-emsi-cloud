<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand text-blue text-label"  href="#"><i class="fas fa-cloud text-cyan"></i><strong class="text-cyan">Emsi</strong>Cloud</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-1"
                    aria-controls="navbarNavDropdown-1" aria-expanded="false" aria-label="Toggle navigation" style="">
                <span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown-1">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/home">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/documents">Documents</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="loggedIn">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false"> <img src="../assets/img/user.png" class="mr-2"
                                                                            alt="">
                            {{userName}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link class="dropdown-item" to="/add-documents">Add Document</router-link>
                            <a class="dropdown-item" @click="logout()" href="#">logout</a>
                        </div>
                    </li>
                    <li class="nav-item" v-if="!loggedIn">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!loggedIn">
                        <router-link class="nav-link" to="/register">register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "navBar",
        data: () => {
            return {
                user: {},
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            },
            userName(){
                return this.$store.getters.userName;
            }
        },
        methods: {
            getCurrentUser() {
                this.$store.dispatch('retrieveName')
                    .then(response => {
                        response.data.message.fullName
                    });
            },
            logout() {
                this.$store.dispatch('destroyToken')
                    .then(response => {
                        this.$router.push({name: 'home'})
                    })
            },
        },
        created() {
            this.getCurrentUser();
        },
    }
</script>

<style scoped>

</style>