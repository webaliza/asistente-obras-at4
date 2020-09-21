<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar title="Asistente obras: trabajadores">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <f7-list v-if="show_small_workers_list" no-hairlines>
                <f7-list-item
                        :checked="selected_workers_list.includes(worker[0])"
                        checkbox=""
                        v-for="(worker, index) in this.getWorkersList"
                        :key="index"
                        :value="worker[0]"
                        :title="worker[1]"
                        @change="setWorker"
                ></f7-list-item>
            </f7-list>

            <f7-button
                    text="+ TRABAJADORES"
                    v-if="show_small_workers_list"
                    @click="showMoreWorkers"
            ></f7-button>

            <f7-list v-if="show_big_workers_list" no-hairlines>
                <f7-list-item
                        :checked="selected_workers_list.includes(worker[0])"
                        checkbox=""
                        v-for="(worker, index) in this.getWorkersListBig"
                        :key="index"
                        :value="worker[0]"
                        :title="worker[1]"
                        @change="setWorker"
                ></f7-list-item>
            </f7-list>

            <f7-button
                    text="- TRABAJADORES"
                    v-if="show_big_workers_list"
                    @click="showLessWorkers"
            ></f7-button>

            <br>
            <!-- Submit -->
            <f7-button text="Aceptar" @click="confirm" fill large raised></f7-button>

        </f7-block>

    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config.js";
    import {mapGetters} from "vuex";

    export default {
        name: "WorkersPage",
        data() {
            return {
                selected_workers_list: [],
                show_small_workers_list: true,
                show_big_workers_list: false,
            }
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
                "getWorkersListBig",
                'getHoursType',
                'getHours',
                'getComments'
            ])
        },
        methods: {
            showMoreWorkers() {
                this.show_small_workers_list = false;
                this.show_big_workers_list = true;
            },
            showLessWorkers() {
                this.show_small_workers_list = true;
                this.show_big_workers_list = false;
            },
            setWorker(event) {
                const self = this;
                const value = event.target.value;
                if (event.target.checked) {
                    console.log('check')
                    self.selected_workers_list.push(value);
                } else {
                    console.log('uncheck')
                    self.selected_workers_list.splice(self.selected_workers_list.indexOf(value), 1);
                }
            },
            confirm() {

                if (
                    // Validar la existencia de datos
                    this.getCurrentProjectCode === null ||
                    this.getCurrentChapterCode === null ||
                    this.getCurrentEntryCode === null
                ) {
                    this.$f7.dialog.alert("Faltan datos", "Atención");
                    return false;
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
                bodyFormData.set("ls_cod_trabajador", this.selected_workers_list);

                // Send request
                axios({
                    method: "post",
                    url: WS_PATH + "set_worker_time.php",
                    data: bodyFormData
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

                            // Redirect to Settings Page
                            setTimeout(() => {
                                this.$f7router.navigate("/hours-form");
                            }, 2000);

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
        }
    }
</script>

<style scoped>

</style>