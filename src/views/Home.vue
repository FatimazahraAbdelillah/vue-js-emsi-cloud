<template>
    <div class="h-100">

        <div class="container">
            <div class="row p-5 h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <img src="../assets/img/bg_home.png" alt="" width="400">
                </div>
                <div class="col-md-6">
                    <h3 class="text-display">Emsi Cloud</h3>
                    <p class="text-regular">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto?
                        Nihil
                        voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam
                        voluptatum, voluptas exercitationem ratione consectetur et!
                    </p>
                    <router-link class="btn btn-outline-cyan mr-4" to="/documents"><i class="fas fa-search mr-2"></i>Browse
                        Document
                    </router-link>
                </div>
            </div>
        </div>
        <div class="bg-light py-5 my-5">
            <div class="container " ref="lastDocument">
                <h3 class="font-weight-light background text-center text-title font-weight-bold mb-2 py-3 my-0"><span style="background: #F8F9FA;">Dernier Documents
                    Ajoutée</span></h3>
                <div class="row">
                    <div v-for="lastAddedDocument in lastAddedDocuments" :key="lastAddedDocument.id" class="col-md-4">
                        <card :title="lastAddedDocument.title" :id="lastAddedDocument.id"
                              :downloadLink="lastAddedDocument.downloadLink"
                              :year="lastAddedDocument.year" :userFullName="lastAddedDocument.fullName"
                              :filiereShort="lastAddedDocument.filiereShort" :moduleName="lastAddedDocument.moduleName"
                              :semestre="lastAddedDocument.semestre">
                        </card>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-5 text-center">
            <div class="container">
                <h3 class="font-weight-light background text-title font-weight-bold  mb-3 py-3 my-0"><span>Selectionner votre filiere</span></h3>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card bg-dark overlay overlay-black text-white shadow-lg border-0 mb-3">
                            <img class="card-img" src="../assets/img/GI.jpg" alt="Card image">
                            <div class="card-img-overlay d-flex align-items-center text-center">
                                <div class="card-body">
                                    <h3 class="card-title">Filiere</h3>
                                    <p class="card-text text-white text-capitalize">
                                        Génie Industriel
                                    </p>
                                    <router-link to="/" class="btn btn-cyan btn-round"><i
                                            class="fas fa-search mr-2"></i>Discover
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-dark overlay overlay-black text-white shadow-lg border-0 mb-3">
                            <img class="card-img" src="../assets/img/IIR.jpg" alt="Card image">
                            <div class="card-img-overlay d-flex align-items-center text-center">
                                <div class="card-body">
                                    <h3 class="card-title">Filiere</h3>
                                    <p class="card-text text-white text-capitalize">
                                        Ingénierie informatique et Réseaux
                                    </p>
                                    <router-link to="/" class="btn btn-cyan btn-round"><i
                                            class="fas fa-search mr-2"></i>Discover
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-dark overlay overlay-black text-white shadow-lg border-0 mb-3">
                            <img class="card-img" src="../assets/img/IFA.jpg" alt="Card image">
                            <div class="card-img-overlay d-flex align-items-center text-center">
                                <div class="card-body">
                                    <h3 class="card-title">Filiere</h3>
                                    <p class="card-text text-white text-capitalize">
                                        Ingénierie Financière et Audit
                                    </p>
                                    <router-link to="/" class="btn btn-cyan btn-round"><i
                                            class="fas fa-search mr-2"></i>Discover
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- minimal footer -->
        <footer class="bg-black pb-5 pt-4">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-md-12">
			<span class="d-block mt-3 text-gray">Made with <i class="fas fa-heart text-danger mx-2"></i> by <strong class="text-presentation">Amine FARHAT & Badr LAKRIMI</strong></span>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <!-- minimal footer -->

</template>

<script>
    import axios from "axios";
    import card from "../components/card";

    export default {
        name: 'home',
        props: [
            "downloadLink",
            "filiereShort",
            "moduleName",
            "semestre",
            "title",
            "userFullName",
            "year"
        ],
        components: {
            card
        },
        data: () => {
            return {
                courses: {},
                token: '',
                fullPage: false,
                lastAddedDocuments: {}
            }
        },
        methods: {
            lastAddedDocument() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.lastDocument,
                    canCancel: false,
                    onCancel: this.onCancel,
                });
                this.$store.dispatch('lastAddedDocument')
                    .then(({data}) => {
                        loader.hide();
                        this.lastAddedDocuments = data;
                    })
                    .catch(error => {

                    });
            }
        },
        beforeCreate() {
            if (!this.$session.has('token')) {
                this.$router.push('/login')
            }
        },
        created() {
            this.lastAddedDocument();
        }
    }
</script>

<style scoped>

</style>