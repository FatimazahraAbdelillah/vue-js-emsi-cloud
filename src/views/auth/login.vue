<template>
    <div class="container  h-100 mt-5">
        <div class="row justify-content-center h-100">
            <div class="card shadow-sm  border-0 card-block">
                <div class="row">
                    <div class="col-md-6 my-auto">
                        <div class="card-body">
                            <h2 class="mb-2">Login</h2>
                            <div class="alert alert-danger mt-2 shadow-sm" v-show="validationErrors.error" role="alert">
                                {{validationErrors.message}}
                            </div>
                            <span v-show="validationErrors.error ===false">Welcome Back</span>
                            <form @submit.prevent="handleLogin">
                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input id="email" v-model="user.email" type="email" placeholder="e-mail address"
                                           :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                                           class="form-control" name="email" autocomplete="email" autofocus>
                                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                        <span v-if="!$v.user.email.required">Email is required</span>
                                        <span v-if="!$v.user.email.email">Email is invalid</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" type="password" v-model="user.password"
                                           placeholder="Mot de passe"
                                           class="form-control " name="password"
                                           :class="{ 'is-invalid': submitted && $v.user.password.$error }"
                                           autocomplete="current-password">
                                    <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                        <span v-if="!$v.user.password.required">Password is required</span>
                                    </div>
                                </div>
                                <div class="form-group mb-0">
                                    <div class="">
                                        <button type="submit" class="btn btn-block btn-info">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-6 ">
                        <img src="../assets/img/bg.png" alt="something" class="p-2 " srcset="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, email} from 'vuelidate/lib/validators'
    import axios from 'axios'

    export default {
        name: "login",
        methods: {
            handleLogin() {
                this.$store.dispatch('retrieveToken', {
                    email: this.user.email,
                    password: this.user.password
                }).then(response => {
                    this.$router.push({name: 'home'});
                })
            }
        },
        computed: {},
        data: () => {
            return {
                user: {
                    email: '',
                    password: '',
                },
                validationErrors: {},
                error: false,
                submitted: false
            }
        },
        validations: {
            user: {
                email: {required, email},
                password: {required}
            }
        },
        beforeCreate() {

        }
    }
</script>

<style scoped>

</style>