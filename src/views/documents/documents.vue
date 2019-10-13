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
            <div class="row ">
                <div class="col-md-3">
                    <ul class="list-group border-0 mb-3 card shadow-sm  p-2">
                        <li class="list-group-item" style="border: none">
                            <h6 class="m-0"><i class="fas fa-filter mr-2"></i>Filter</h6>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <a href="#" class="filter-link"><i class="fas fa-calendar mr-2"></i>By Date</a>
                        </li>
                    </ul>
                    <ul class="list-group border-0 mb-3 card shadow-sm  p-2">
                        <li class="list-group-item" style="border: none">
                            <h6 class="m-0 d-inline float-left"><i class="fas fa-calendar-check mr-2"></i>Semestre</h6>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="semestre" @change="GetCourseBySemestre" value="1er Semestre"
                                       v-model="RdoSemestre" class="custom-control-input" id="1semestre">
                                <label class="custom-control-label" for="1semestre">1er Semestre</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="semestre" @change="GetCourseBySemestre" value="2eme Semestre"
                                       v-model="RdoSemestre" class="custom-control-input" id="2semetre">
                                <label class="custom-control-label" for="2semetre">2eme Semestre</label>
                            </div>
                        </li>
                    </ul>
                    <!-- End Semestre -->
                    <ul class="list-group border-0 mb-3 card shadow-sm  p-2">
                        <li class="list-group-item" style="border: none">
                            <h6 class="m-0 float-left"><i class="fas fa-calendar-alt mr-2"></i>Année Universitaire</h6>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="year" v-model="RdoYear" @change="GetCourseByYear"
                                       value="3eme Annee" class="custom-control-input" id="3year">
                                <label class="custom-control-label" for="3year">3eme Annees</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="year" v-model="RdoYear" @change="GetCourseByYear"
                                       value="4eme Annee" class="custom-control-input" id="4year">
                                <label class="custom-control-label" for="4year">4eme Annees</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="year" v-model="RdoYear" @change="GetCourseByYear"
                                       value="5eme Annee" class="custom-control-input" id="5year">
                                <label class="custom-control-label" for="5year">5eme Annees</label>
                            </div>
                        </li>
                    </ul>
                    <!--End Year-->
                    <ul class="list-group border-0 mb-3 card shadow-sm  p-2">
                        <li class="list-group-item" style="border: none">
                            <h6 class="m-0 float-left"><i class="fas fa-briefcase mr-2"></i>Filiere</h6>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="filiere" v-model="RdoFiliere" @change="GetCourseByFiliere"
                                       value="IIR" class="custom-control-input" id="iir">
                                <label class="custom-control-label font-weight-bolder" style="font-size: 14px;"
                                       for="iir">Ingénierie informatique et Réseaux</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="filiere" v-model="RdoFiliere" @change="GetCourseByFiliere"
                                       value="GC" class="custom-control-input" id="GC">
                                <label class="custom-control-label font-weight-bolder" style="font-size: 14px;"
                                       for="GC">Genie Civil</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="filiere" v-model="RdoFiliere" @change="GetCourseByFiliere"
                                       value="IAII" class="custom-control-input" id="IAII">
                                <label class="custom-control-label font-weight-bolder" style="font-size: 14px"
                                       for="IAII">Ingénierie des automatismes et informatique industrielle</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="filiere" v-model="RdoFiliere" @change="GetCourseByFiliere"
                                       value="GI" class="custom-control-input" id="GI">
                                <label class="custom-control-label font-weight-bolder" style="font-size: 14px;"
                                       for="GI">Génie Industriel</label>
                            </div>
                        </li>
                        <li class="list-group-item" style="border: none">
                            <div class="custom-control custom-radio">
                                <input type="radio" name="filiere" v-model="RdoFiliere" @change="" alue="IFA"
                                       class="custom-control-input" id="IFA">
                                <label class="custom-control-label font-weight-bolder" style="font-size: 14px;"
                                       for="IFA">Ingénierie financière et audit</label>
                            </div>
                        </li>
                    </ul>
                    <!--End Filiere-->
                </div>
                <div class="col-md-9 vld-parent" ref="searchCard">
                    <div v-if="filter" class="alert shadow-sm alert-danger d-flex justify-content-between">
                        <p class="m-0">Clear Filtering</p>
                        <p class="m-0" @click="clearFilter()"><i class="fas fa-times  pointer"></i></p>
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
                fullPage: false,
                RdoSemestre: '',
                filteredCourse: {},
                RdoYear: '',
                filter: false,
                RdoFiliere: '',
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
            },
            GetCourseBySemestre() {
                this.filter = true;
                this.courses = this.courses.filter(course => course.semestre === this.RdoSemestre);
            },
            GetCourseByYear() {
                this.filter = true;
                this.courses = this.courses.filter(course => course.year === this.RdoYear);
            },
            GetCourseByFiliere() {
                this.filter = true;
                this.courses = this.courses.filter(course => course.filiereShort === this.RdoFiliere);
            },
            clearFilter() {
               this.filter = false;
               this.getAllDocument();
               this.RdoFiliere = false;
               this.RdoYear = false;
               this.RdoSemestre = false;
            }
        },
        created() {
            this.getAllDocument();
        }
    }
</script>

<style scoped>

</style>