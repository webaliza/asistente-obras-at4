<template>
    <f7-page @page:afterin="setPicker">
        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home" title="Asistente obras: parte trabajo">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block no-hairlines id="main-block">
            <!-- Calendar -->
            <f7-card>
                <f7-card-header>
                    <f7-icon material="event"></f7-icon>
                    <span>&nbsp;Fecha</span>
                </f7-card-header>
                <div class="card-content" @click="gotoCalendarPage">
                    {{ getDateOfWork }}
                </div>
            </f7-card>

            <f7-card>
                <f7-card-header>
                    <f7-icon material="home"></f7-icon>
                    <span>&nbsp;Proyecto</span>
                </f7-card-header>
                <div class="card-content" @click="gotoProjectsPage">
                    <p v-if="getCurrentProjectCode != null">{{ getProjects[getCurrentProjectCode][0] }}</p>
                    <p v-else>Seleccionar...</p>
                </div>
            </f7-card>

            <f7-card>
                <f7-card-header>
                    <f7-icon material="view_agenda"></f7-icon>
                    <span>&nbsp;Capítulo</span>
                </f7-card-header>
                <div class="card-content" @click="gotoChaptersPage">
                    <p
                            v-if="getCurrentProjectCode != null && getCurrentChapterCode != null"
                    >{{ getProjects[getCurrentProjectCode][1][getCurrentChapterCode][0] }}</p>
                    <p v-else>Seleccionar...</p>
                </div>
            </f7-card>

            <f7-card>
                <f7-card-header>
                    <f7-icon material="view_column"></f7-icon>
                    <span>&nbsp;Partida</span>
                </f7-card-header>
                <div class="card-content" @click="gotoEntriesPage">
                    <p
                            v-if="getCurrentProjectCode != null && getCurrentChapterCode != null && getCurrentEntryCode!= null"
                    >{{ getProjects[getCurrentProjectCode][1][getCurrentChapterCode][1][getCurrentEntryCode] }}</p>
                    <p v-else>Seleccionar...</p>
                </div>
            </f7-card>

            <f7-card>
                <f7-card-header>
                    <f7-icon material="brightness_2"></f7-icon>
                    <span>&nbsp;Horas nocturnas</span>
                </f7-card-header>
                <div class="center card-content">
                    <f7-toggle color="orange" @toggleChange="setHoursType" ref="toggle_hours_type"></f7-toggle>
                </div>
            </f7-card>

            <f7-card>
                <f7-card-header>
                    <f7-icon material="timer"></f7-icon>
                    <span>&nbsp;Horas</span>
                </f7-card-header>
                <div class="center card-content">
                    <input
                            type="text"
                            readonly="readonly"
                            id="picker-hours"
                            class="center"
                            @change="setHours($event.target.value)"
                    >
                </div>
            </f7-card>

        </f7-block>

        <f7-block>

            <f7-card>
                <f7-card-header>
                    <f7-icon material="comment"></f7-icon>
                    <span>&nbsp;Observaciones</span>
                </f7-card-header>
                <div class="center card-content">
                    <f7-list>
                        <f7-list-input
                                id="comments-txt"
                                type="textarea"
                                style="width: 100%"
                                :value="this.getComments"
                                @input="setComments($event.target.value)"
                                resizable
                                clear-button></f7-list-input>
                    </f7-list>
                </div>
            </f7-card>

        </f7-block>

        <f7-toolbar no-hairline no-shadow position="bottom">
            <f7-button fill large round raised @click="setWorkerTime">GUARDAR</f7-button>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config.js";
    import {mapGetters} from "vuex";

    export default {
        name: "HoursFormPage",
        data() {
            return {
                //
            };
        },
        computed: {
            ...mapGetters([
                "getProjects",
                "getUserName",
                "getUserID",
                "getUserPass",
                "getDateOfWork",
                "getCurrentProjectCode",
                "getCurrentChapterCode",
                "getCurrentEntryCode",
                "getWorkersList",
                'getHoursType',
                'getHours',
                'getComments'
            ])
        },
        mounted() {
            if (this.getDateOfWork === null) {
                // Set the current date in store
                this.$store.dispatch("setDateOfWork", this.getToday());
            }

            this.$$('#comments-txt').focusin(() => {
                console.log('focus in')
                this.$$('#main-block').css('display', 'none')
                //this.$$('#comments-txt').css('margin-bottom', '300px')
                //this.$$('.page-content').scrollTop(10000, 400);
            });

            this.$$('#comments-txt').focusout(() => {
                console.log('focus out')
                this.$$('#main-block').css('display', 'block')
                //this.$$('#comments-txt').css('margin-bottom', '0px')
            });
        },
        methods: {
            setPicker() {

                var picker = this.$f7.picker.create({
                    inputEl: "#picker-hours",
                    rotateEffect: true,
                    scrollToInput: true,
                    momentumRatio: 14,
                    toolbarCloseText: "Hecho",
                    formatValue: function (values, displayValues) {
                        return values[0];
                    },
                    cols: [
                        {
                            textAlign: "center",
                            values: "1 1.5 2 2.5 3 3.5 4 4.5 5 5.5 6 6.5 7 7.5 8 8.5 9 9.5 10 10.5 11 11.5 12 12.5 13 13.5 14 14.5 15 15.5 16 16.5 17 17.5 18 18.5 19 19.5 20 20.5 21 21.5 22 22.5 23 23.5".split(
                                " "
                            )
                        },
                    ],
                });

                picker.setValue([this.getHours], 1000)
            },
            gotoCalendarPage() {
                this.$f7router.navigate("/calendar");
            },
            gotoProjectsPage() {
                this.$f7router.navigate("/projects");
            },
            gotoChaptersPage() {
                if (this.getCurrentProjectCode === null) {
                    this.$f7.dialog.alert("Debe seleccionar un proyecto", "Atención");
                    return false;
                }
                this.$f7router.navigate("/chapters");
            },
            gotoEntriesPage() {
                //console.log("clic");
                if (this.getCurrentChapterCode === null) {
                    this.$f7.dialog.alert("Debe seleccionar un capítulo", "Atención");
                    return false;
                }
                this.$f7router.navigate("/entries");
            },
            setHoursType(e) {
                e === true ? this.$store.dispatch("setHoursType", 'N') : this.$store.dispatch("setHoursType", 'H');
            },
            setHours(value) {
                this.$store.dispatch("setHours", value);
            },
            setComments(value) {
                this.$store.dispatch("setComments", value);
            },
            setWorkerTime() {

                if (
                    // Validar la existencia de datos
                    this.getCurrentProjectCode === null ||
                    this.getCurrentChapterCode === null ||
                    this.getCurrentEntryCode === null
                ) {
                    this.$f7.dialog.alert("Faltan datos", "Atención");
                    return false;
                }

                if (this.getWorkersList.length > 1) {
                    // Navigate
                    this.$f7router.navigate("/select-workers");
                    return
                }

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
                //---
                bodyFormData.set("cod_obra", this.getCurrentProjectCode);
                bodyFormData.set("cod_capitulo", this.getCurrentChapterCode);
                bodyFormData.set("cod_partida", this.getCurrentEntryCode);
                bodyFormData.set("fecha", this.formatDateForSending(this.getDateOfWork));
                bodyFormData.set("horas", this.getHours);
                bodyFormData.set("tipo_hora", this.getHoursType);
                bodyFormData.set("observaciones", this.getComments);
                bodyFormData.set("ls_cod_trabajador", this.getWorkersList[0][0]);

                // Send request
                axios({
                    method: "post",
                    url: WS_PATH + "set_worker_time.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        //console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.resultado === "ok: parte grabado") {
                            let notification = this.$f7.toast.create({
                                position: "top",
                                text: "Parte de trabajo guardado",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();

                        } else {
                            this.$f7.dialog.alert(
                                "No ha sido posible guardar en gsBase",
                                "Error"
                            );
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            formatDateForSending(date) {
                date = date.split("-");
                let formattedDate = date.join("");
                return formattedDate;
            },
            getToday() {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + "-" + mm + "-" + yyyy;
                return today;
            },
        }
    };
</script>

<style scoped>
    .center {
        text-align: center;
    }

    .center * {
        margin: auto;
    }

    .card-content {
        padding: 20px;
    }

    .card-header span {
        width: 100% !important;
    }

    .project-name {
        text-align: center;
        padding: 6px 12px;
    }

    .toolbar {
        height: 64px !important;
        background-color: #ffffff;
    }

    .toolbar .button {
        width: 100%;
        margin: 20px;
    }

    .ios .toolbar {
        background-color: #EFEFF4 !important;
    }
</style>