<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-title>Inicio</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
            <f7-card outline>
                <div @click="goToFormPage">
                    <h1>
                        <f7-icon material="description" size="48px"></f7-icon>&nbsp;&nbsp;Nuevo Parte
                    </h1>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="goToPlaningPage">
                    <h1>
                        <f7-icon material="event_note" size="48px"></f7-icon>&nbsp;&nbsp;Planning
                    </h1>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="checkActions">
                    <h1>
                        <f7-icon material="timer" size="48px"></f7-icon>&nbsp;&nbsp;{{ check_label }}
                    </h1>
                </div>
            </f7-card>

            <f7-card outline>
                <div @click="goToHistoryPage">
                    <h1>
                        <f7-icon material="archive" size="48px"></f7-icon>&nbsp;&nbsp;Histórico F.
                    </h1>
                </div>
            </f7-card>
        </f7-block>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config.js";
    import {mapGetters} from "vuex";

    export default {
        name: "HomePage",
        data() {
            return {
                check_label: "Check In"
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserID", "getUserPass"])
        },
        mounted() {

            if (localStorage.aor_check_label === undefined) {
                localStorage.aor_check_label = 'Check In';
            }

            this.check_label = localStorage.aor_check_label;
        },
        methods: {
            goToFormPage() {
                this.$f7router.navigate("/hours-form");
            },
            goToPlaningPage() {
                this.$f7router.navigate("/planning");
            },
            goToHistoryPage() {
                this.$f7router.navigate("/history");
            },
            checkActions() {

                // Preloader On
                this.$f7.dialog.preloader("Guardando...");

                // Build form data
                let bodyFormData = new FormData();
                bodyFormData.set("usuario", this.getUserName);
                bodyFormData.set("contrasenya", this.getUserPass);
                bodyFormData.set("cod_trabajador", this.getUserID);
                bodyFormData.set("ipgsbase", localStorage.aor_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aor_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aor_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aor_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aor_puertogsbase);

                // Send request
                axios({
                    method: "post",
                    url: WS_PATH + "check-in.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.usuario_valido === "ok") {

                            // Show toast
                            let notification = this.$f7.toast.create({
                                position: "top",
                                text: response.data.texto_msg,
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();

                            // Change label
                            if (localStorage.aor_check_label === 'Check In') {
                                localStorage.aor_check_label = 'Check Out'
                                this.check_label = localStorage.aor_check_label;
                            }
                            else {
                                localStorage.aor_check_label = 'Check In'
                                this.check_label = localStorage.aor_check_label;
                            }

                            /*} else if (response.data.res === "1") {

                                this.$f7.dialog.alert(
                                    response.data.texto_msg,
                                    "Error"
                                );*/

                        } else {

                            this.$f7.dialog.alert(
                                "No se obtuvo respuesta del servidor",
                                "Error"
                            );
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            }
        }
    };
</script>

<style scoped>
    .card {
        margin-bottom: 30px !important;
    }

    .card h1 {
        margin: 12px 12px 12px 18px;
    }
</style>