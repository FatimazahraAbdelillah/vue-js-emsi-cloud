<template>
    <div class="container py-4">

        <div class="row justify-content-center align-items-center">

            <div class="col-md-6">
                <h2 class="text-bold"><i class="fas fa-file-download mr-3"></i>Add a document </h2>
                <form action="" @submit.prevent="addDocument()" ref="addDocument">
                    <div class="form-group">
                        <div class="form-row">
                            <div class="col-md-6">
                                <label class="text-label" for="title">Document Title</label>
                                <input type="text" :class="{ 'is-invalid': submitted && $v.document.title.$error }"
                                       v-model="document.title" name="title" id="title" class="form-control">
                                <div v-if="submitted && $v.document.title.$error" class="invalid-feedback">
                                    <span v-if="!$v.document.title.required"><i
                                            class="fas fa-exclamation-circle mr-1"></i>Document Title is required</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="text-label" for="filiere">Filiere</label>
                                <select name="" :class="{ 'is-invalid': submitted && $v.document.filiere.$error }"
                                        v-model="document.filiere" @change="getShortFiliere($event)"
                                        class="form-control" id="filiere">
                                    <option value="IIR">Ingénierie informatique et Réseaux</option>
                                    <option value="IAII">Ingénierie des automatismes et informatique industrielle
                                    </option>
                                    <option value="IFA">Ingénierie financière et audit</option>
                                    <option value="GC">Génie Civil</option>
                                    <option value="GI">Génie Industriel</option>
                                </select>
                                <div v-if="submitted && $v.document.filiere.$error" class="invalid-feedback">
                                    <span v-if="!$v.document.filiere.required"><i
                                            class="fas fa-exclamation-circle mr-1"></i>Filiere is required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-row">
                            <div class="col-md-6">
                                <label class="text-label" for="year">Années Universitaire</label>
                                <select name="" v-model="document.year"
                                        :class="{ 'is-invalid': submitted && $v.document.year.$error }"
                                        class="form-control"
                                        @change="getYear($event)"
                                        id="year">
                                    <option value="3eme Annee">3eme Annee</option>
                                    <option value="4eme Annee">4eme Annee</option>
                                    <option value="5eme Annee">5eme Annee</option>
                                </select>
                                <div v-if="submitted && $v.document.year.$error" class="invalid-feedback">
                                    <span v-if="!$v.document.year.required"><i
                                            class="fas fa-exclamation-circle mr-1"></i>Years is required</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="text-label" for="semestre">Semestre</label>
                                <select name="" v-model="document.semestre"
                                        :class="{ 'is-invalid': submitted && $v.document.semestre.$error }"
                                        class="form-control"
                                        @change="getSemestre($event)"
                                        id="semestre">
                                    <option value="1er Semestre">1er Semestre</option>
                                    <option value="2eme Semestre">2eme Semestre</option>
                                </select>
                                <div v-if="submitted && $v.document.semestre.$error" class="invalid-feedback">
                                    <span v-if="!$v.document.semestre.required"><i
                                            class="fas fa-exclamation-circle mr-1"></i>semestre is required</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="text-label" for="module">Module</label>
                            <select name="" v-model="document.moduleId"
                                    :class="{ 'is-invalid': submitted && $v.document.moduleId.$error }"
                                    class="form-control"
                                    @change="getModuleId($event)"
                                    id="module">
                                <option
                                        v-for="subject in subjects"
                                        :value="subject.id"
                                        :key="subject.id">{{subject.libelle}}
                                </option>
                            </select>
                            <div v-if="submitted && $v.document.moduleId.$error" class="invalid-feedback">
                                    <span v-if="!$v.document.moduleId.required"><i
                                            class="fas fa-exclamation-circle mr-1"></i>Module is required</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="text-label" for="fileUpload">Upload file</label>
                            <vueDropzone class=""
                                         ref="file"
                                         id="fileUpload"
                                         :options="dropzoneOptions"
                                         @vdropzone-file-added="fileAdded"
                                         :class="{ 'border-danger': submitted && fileError}"
                            ></vueDropzone>
                            <div v-if="submitted && fileError" class="file-required"><i
                                    class="fas fa-exclamation-circle mr-1"></i>File is Required
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-outline-cyan"><i class="fas fa-cloud mr-3"></i>Add Document</button>
                </form>
            </div>
            <div class="col-md-6">
                <img src="../../assets/img/upload.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'
    import vue2Dropzone from "vue2-dropzone";
    import "vue2-dropzone/dist/vue2Dropzone.min.css";

    export default {
        name: "add_documents",
        data: () => {
            return {
                document: {
                    title: '',
                    filiere: '',
                    moduleId: '',
                    year: '',
                    files: [],
                    semestre: ''
                },
                url: {
                    semestre: '',
                    filiere: '',
                    year: ''
                },
                subjects: {},
                fileError: true,
                submitted: false,
                dropzoneOptions: {
                    // The Url Where Dropped or Selected files will be sent
                    url: `https://httpbin.org/post`,
                    // File Size allowed in MB
                    maxFilesize: 10,
                    maxFiles: 1,
                    acceptedFiles: ".docx,.doc,.pdf,.xsl,.xslx,.ppt,.pptx,.rar,.zip",
                    dictInvalidFileType: "File Type not allowed",
                    addRemoveLinks: true,
                    dictRemoveFile: "Remove",
                    // Authentication Headers like Access_Token of your application
                    headers: {
                        Authorization: `Access Token`
                    },
                    dictDefaultMessage: "<span class='text-bold'><i class='fa fa-cloud mr-2'></i>Upload file here</span>",
                    thumbnailWidth: 600,
                    thumbnailHeight: 500,
                    uploadMultiple: false,
                }
            }
        },
        validations: {
            document: {
                title: {required},
                filiere: {required},
                year: {required},
                semestre: {required},
                moduleId: {required}
            }
        },
        methods: {
            addDocument() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.addDocument,
                    canCancel: false,
                    onCancel: this.onCancel,
                });
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    loader.hide();
                    if (this.document.files.length <= 0) {
                        this.fileError = true;
                    }
                    return;
                }
                this.$store.dispatch('uploadDocument', {
                    title: this.document.title,
                    moduleId: this.document.moduleId,
                    file:this.document.files
                }).then(() => {
                   loader.hide();
                }).catch(() => {
                   loader.hide();
                });
            },
            fileAdded(file) {
              this.document.files = file;
            },
            getModuleId(event) {
                this.document.moduleId = event.target.value;
            },
            getSemestre(event) {
                this.url.semestre = event.target.value;
                this.$store.dispatch('retrieveModules', {
                    filiere: this.url.filiere,
                    semestre: this.url.semestre,
                    year: this.url.year
                }).then((response) => {
                    this.subjects = response.data;
                }).catch(() => {
                   
                });
            },
            getShortFiliere(event) {
                this.url.filiere = event.target.value;
            },
            getYear(event) {
                this.url.year = event.target.value;
            }
        },
        components: {
            vueDropzone: vue2Dropzone,
        },
        created() {
            
        }
    }
</script>

<style scoped>

</style>