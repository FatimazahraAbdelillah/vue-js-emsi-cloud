<template>
    <div>
        <!-- Author Card -->
        <div class="card bg-dark overlay overlay-black text-white shadow-lg border-0 my-3">
            <img class="card-img" :src="getImgUrl( this.card.filiere)" alt="Card image">
            <div class="card-img-overlay d-flex align-items-center text-center">
                <div class="card-body">
                    <h3 class="card-title">{{this.card.title}}</h3>
                    <p class="card-text text-white">
                      {{this.card.semestre}}
                    </p>
                    <a :href="this.card.downloadLink" class="btn btn-cyan btn-round text-white">Download</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: [
            "downloadLink",
            "filiereShort",
            "moduleName",
            "semestre",
            "title",
            "userFullName",
            "year"
        ],
        methods: {
            initCard() {
                this.card.id = this.id;
                this.card.downloadLink = this.downloadLink;
                this.card.title = this.title;
                this.card.filiere = this.filiereShort;
                this.card.module = this.moduleName;
                this.card.user = this.user;
                this.card.year = this.year;
                this.card.semestre = this.semestre;
            },
            getImgUrl(pic) {
                return require('../assets/img/' + pic + ".jpg")
            }
        },
        data: () => {
            return {
                card: {
                    id: "",
                    downloadLink: "",
                    title: "",
                    filiere: "",
                    module: "",
                    year: "",
                    semestre: "",
                    user: ""
                },

            };
        },
        created() {
            this.initCard();
        }
    }
</script>

<style scoped>

</style>