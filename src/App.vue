<template>
    <div id="app">
        <nav-bar></nav-bar>
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
                    mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>
<script>
    import navBar from "./components/navBar";


    export default {
        name: "app",
        components: {
            navBar
        },
        data: () => {
            return {}
        },
        beforeCreate() {
            this.$session.start();
        }
    }
</script>
<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap');

    .bg-blue {
        background-color: #0099ff;
        color: white;
    }

    .text-presentation {
        font-family: 'Lobster', cursive;
    }

    .text-title{
        font-family: 'Lobster', cursive;
    }

    .text-display {
        font-family: 'Lato', sans-serif;
        font-weight: 900;
        line-height: 56px;
        font-size: 46px;
        color: #102a43;
    }

    .text-display-sm{
        font-family: 'Lato', sans-serif;
        font-weight: 900;
        line-height: 46px;
        font-size: 36px;
        color: #102a43;
    }

    .text-label {
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        line-height: 40px;
        font-size: 14px;
        color: #102a43;
    }

    .text-regular {
        font-family: 'Lato', sans-serif;
        font-weight: normal;
        line-height: 28px;
        font-size: 18px;
        color: #102a43;
    }

    .text-blue {
        color: #102a43 !important;
    }

    .text-bold {
        font-family: 'Lato', sans-serif;
        font-weight: normal;
        line-height: 40px;
        font-size: 30px;
        color: #102a43;
    }

    .file-required {
        width: 100%;
        margin-top: 0.25rem;
        font-size: 85%;
        color: #e53935;
    }
    .text-danger{
        color: #e53935 !important;
    }

    .invalid-feedback {
        color: #e53935 !important;
    }

    .was-validated .form-control:invalid, .form-control.is-invalid, .was-validated .custom-select:invalid, .custom-select.is-invalid {
        border-color: #e53935 !important;
    }

    .nav-search-links {
        color: #102a43;
        font-size: 17px;
        font-weight: bold;

        .active {
            color: white;
        }
    }

    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        right: 26px;
        top: 9px;
        display: block;
        width: 21px;
        height: 21px;
        line-height: 21px;
        text-align: center;
        pointer-events: none;
        color: #6c757d;
    }

    .filter-link {
        color: #102a43;
        font-weight: bolder;
        text-decoration: none !important;

        &:hover {
            color: #303f9f;
        }
    }
    .pointer{
        cursor: pointer;
        user-select: none;
    }

    .nav-item .active {
        background-color: #303f9f !important;
    }

    .list-group-item.active {
        background-color: #303f9f !important;
        border-radius: 3px;

        a {
            color: white !important;
        }
    }
    .text-danger{
        color:#e53935 !important;
        font-weight: 500;
    }
    .server-error {
        margin-bottom: 12px;
        font-size: 16px;
        padding: 10px 16px;
        color: #e53935;
        background: #F3DEDE;
        border-radius: 4px;
    }

    /*css spinner*/
    .lds-ring-container {
        position: absolute;
        right: 50%;
    }

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
    }

    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 25px;
        height: 25px;
        // margin: 6px;
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .alert-danger {
        background-color: #e53935 !important;
    }

    .alert-success {
        background-color: #388e3c;
    }

    h3.background {
        position: relative;
        z-index: 1;

        &:before {
            border-top:5px solid #212529;
            border-radius: 5px;
            content:"";
            margin: 0 auto; /* this centers the line to the full width specified */
            position: absolute; /* positioning must be absolute here, and relative positioning must be applied to the parent */
            top: 50%; left: 0; right: 0; bottom: 0;
            width: 95%;
            z-index: -1;
        }

        span {
            /* to hide the lines from behind the text, you have to set the background color the same as the container */
            background: #fff;
            padding: 0 15px;
        }
    }
</style>
