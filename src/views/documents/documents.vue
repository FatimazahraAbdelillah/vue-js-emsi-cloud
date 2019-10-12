<template>
    <div>
        <div class="container-fluid">
            <div class="p-4">
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-bold font-weight-bold ">Documents</h6>
                    </div>
                    <div class="offset-3 col-md-3">
                        <div class="form-group has-search">
                            <span class="fas fa-search form-control-feedback"></span>
                            <input type="text" v-model="keyWord" @keyup.enter="getCourse"
                                   class="form-control input-round"
                                   placeholder="Search document ...">
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="card shadow-sm border-0 p-2">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item">
                            <a class="nav-link nav-search-links" @click="getAllDocument()"
                               href="#">All</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-search-links" @click="filterDocumentByFiliere('IIR')" href="#">IIR</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-search-links"  @click="filterDocumentByFiliere('GI')"  href="#">GI</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-search-links"  @click="filterDocumentByFiliere('IAII')" href="#">IAII</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-search-links" @click="filterDocumentByFiliere('IFA')"  href="#">IFA</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-search-links"  @click="filterDocumentByFiliere('GC')" href="#">GC</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row pt-3">
                <div class="col-md-3">
                    <ul class="list-group border-0 card shadow-sm  p-2">
                        <li class="list-group-item" style="border: none">
                            <h6 class="text-center m-0">Search Filter</h6>
                        </li>
                        <li class="list-group-item active" style="border: none">
                            <a href="#" class="filter-link"><i class="fas fa-calendar mr-2"></i>By Date</a>
                        </li>
                        <li class="list-group-item" style="border: none">Morbi leo risus</li>
                        <li class="list-group-item" style="border: none">Porta ac consectetur ac</li>
                        <li class="list-group-item" style="border: none">Vestibulum at eros</li>

                    </ul>
                </div>
                <div class="col-md-9 vld-parent" ref="searchCard">
                    <div v-if="errorExist" class="alert shadow-sm alert-danger">
                        <i class="fas fa-exclamation-circle mr-2"></i><span
                            class="text-label text-white"> {{error}}</span>
                    </div>
                    <div class="row">

                        <div v-for="course in courses" :key="course.id" class="col-md-4">
                            <card :title="course.title" :id="course.id" :downloadLink="course.downloadLink"
                                  :year="course.year" :userFullName="course.fullName"
                                  :filiereShort="course.filiereShort" :moduleName="course.moduleName"
                                  :semestre="course.semestre">
                            </card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import card from "../../components/card"

    export default {
        name: "documents",
        data: () => {
            return {
                active_el: 0,
                keyWord: '',
                error: '',
                errorExist: false,
                courses: {},
                fullPage: false
            }
        },
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
            card,
        },
        methods: {
            filterDocumentByFiliere(filiere) {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.searchCard,
                    canCancel: false,
                    onCancel: this.onCancel,
                });
                const result = this.courses.filter(course => course.filiereShort === filiere);
                if (result.length <= 0){
                    loader.hide();
                    this.errorExist = true;
                    this.error="No Document Found for " + filiere;
                    return 0;
                }
                loader.hide();
                this.errorExist = false;
                return  this.courses = result;

            },
            getCourse() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.searchCard,
                    canCancel: false,
                    onCancel: this.onCancel,
                });
                this.$store.dispatch('searchCourse', {
                    keyWord: this.keyWord
                })
                    .then(response => {
                        loader.hide();
                        this.errorExist = false;
                        console.log(response);
                        this.courses = response.data.message;
                    })
                    .catch(error => {
                        loader.hide();
                        this.errorExist = true;
                        this.error = error.data.message;
                        this.courses = {}
                    });
            },
            getAllDocument() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.searchCard,
                    canCancel: false,
                    onCancel: this.onCancel,
                });
                this.$store.dispatch('getAllDocument', {
                    keyWord: this.keyWord
                })
                    .then(response => {
                        loader.hide();
                        this.errorExist = false;
                        this.courses = response;
                    })
                    .catch(error => {
                        loader.hide();
                        this.errorExist = true;
                        this.error = error.data.message;
                        this.courses = {}
                    });
            }
        },
        created() {
            this.getAllDocument();
        }
    }
</script>

<style scoped>

</style>