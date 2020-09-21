<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home" title="Asistente obras: planning">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block no-hairlines>

            <!--
            <f7-card>
                <f7-card-header>
                    <f7-icon material="event"></f7-icon>
                    <span>&nbsp;Fecha</span>
                </f7-card-header>
                <div class="card-content">
                    <calendar id="planning_calendar" :value="fecha_inicio"
                              @change="fecha_inicio = setDate($event)"></calendar>
                </div>
            </f7-card>
            -->

            <!-- Worker -->
            <f7-row class="date" v-if="getWorkersList.length > 1">
                <f7-col width="25">
                    <p>Trabajador: </p>
                </f7-col>
                <f7-col width="75">
                    <p>
                        <input
                                type="text"
                                :value="selected_worker_name"
                                readonly="readonly"
                                id="picker-worker"
                                @change="selected_worker_name = $event.target.value"
                        >
                    </p>
                </f7-col>
            </f7-row>

            <!-- Date -->
            <f7-row class="date">
                <f7-col width="25">
                    <p>Fecha: </p>
                </f7-col>
                <f7-col width="75">
                    <p>
                        <input
                                type="text"
                                :value="month_and_year"
                                readonly="readonly"
                                id="picker-date"
                                @change="month_and_year = $event.target.value"
                        >
                    </p>
                </f7-col>
            </f7-row>

            <f7-row>
                <f7-col width="10">&nbsp;</f7-col>
                <f7-col width="80">
                    <!-- Timeline -->
                    <div class="timeline color-theme-white">
                        <!-- Timeline item with inner -->
                        <div class="timeline-item" v-for="(item, key, index) in hours" :key="key">
                            <div class="timeline-item-date">
                                {{ index + 1}} {{ selected_month }}
                            </div>
                            <div class="timeline-item-divider"></div>
                            <div class="timeline-item-content">
                                <div class="timeline-item-inner" v-if="item !== 0">{{ item }} horas</div>
                            </div>
                        </div>
                    </div>
                </f7-col>
                <f7-col width="10">&nbsp;</f7-col>
            </f7-row>

        </f7-block>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config.js";
    import {mapGetters} from "vuex";

    export default {
        name: "PlanningPage",
        data() {
            return {
                months: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                years: [],
                current_month: null,
                current_year: null,
                selected_month: null,
                selected_year: null,
                hours: null,
                month_and_year: null,
                selected_worker_code: null,
                selected_worker_name: null,
                workers_codes: [],
                workers_names: [],
            };
        },
        computed: {
            ...mapGetters(["getUserName", "getUserID", "getUserPass", "getWorkersList"])
        },
        created() {
            this.selected_worker_code = this.getUserID;
            let worker = this.getWorkersList.filter(item => item[0] === this.selected_worker_code)[0];
            this.selected_worker_name = worker[1];
        },
        mounted() {

            // Get the current month
            this.current_month = this.months[parseInt(this.getToday().split("-")[1]) - 1];
            this.selected_month = this.current_month;

            // Get the current year
            this.current_year = parseInt(this.getToday().split("-")[2]);
            this.selected_year = this.current_year;

            // Get the planning
            this.getPlanning();

            // Set data
            this.month_and_year = this.current_month + ' ' + this.current_year

            // Push the years data array
            for (let i = this.current_year - 4; i <= this.current_year; i++) {

                this.years.push(i)
            }

            if(this.getWorkersList.length > 1)
            {
                // Get separated lists from workers list (codes & names)
                this.getWorkersList.forEach((item) => {

                    this.workers_codes.push(item[0]);
                    this.workers_names.push(item[1]);
                });
            }

            // Date picker
            var picker = this.$f7.picker.create({
                inputEl: "#picker-date",
                rotateEffect: true,
                scrollToInput: true,
                momentumRatio: 14,
                toolbar: true,
                toolbarCloseText: "Hecho",
                formatValue: function (values) {
                    return values[0] + " " + values[1];
                },
                cols: [
                    {
                        values: this.months
                    },
                    {
                        divider: true,
                        content: " "
                    },
                    {
                        values: this.years
                    }
                ],
                on: {
                    open: (picker) => {
                        picker.setValue([this.current_month, this.current_year]);
                    },
                    closed: (picker) => {
                        this.selected_month = picker.value[0];
                        this.selected_year = picker.value[1];
                    }
                }
            });

            // Workers picker
            var picker = this.$f7.picker.create({
                inputEl: "#picker-worker",
                rotateEffect: true,
                scrollToInput: true,
                momentumRatio: 14,
                toolbar: true,
                toolbarCloseText: "Hecho",
                formatValue: function (values, displayValues) {
                    return displayValues[0];
                },
                cols: [
                    {
                        values: this.workers_codes,
                        displayValues: this.workers_names,
                        textAlign: 'left',
                    }
                ],
                on: {
                    closed: (picker) => {
                        this.selected_worker_code = picker.value[0];
                    }
                }
            });
        },
        watch: {
            selected_month: "getPlanning",
            selected_year: "getPlanning",
            selected_worker_code: "getPlanning",
        },
        methods: {
            setDate: payload => {
                if (payload == undefined) return;
                let rawDate = payload[0];
                let dd = String(rawDate.getDate()).padStart(2, "0");
                let mm = String(rawDate.getMonth() + 1).padStart(2, "0"); // January is 0!
                let yyyy = rawDate.getFullYear();
                return dd + "-" + mm + "-" + yyyy;
            },
            getPlanning() {

                // Preloader On
                this.$f7.dialog.preloader("Buscando...");

                // Build form data
                let bodyFormData = new FormData();
                bodyFormData.set("usuario", this.getUserName);
                bodyFormData.set("contrasenya", this.getUserPass);
                bodyFormData.set("cod_trabajador", this.selected_worker_code);
                bodyFormData.set("ipgsbase", localStorage.aor_ipgsbase);
                bodyFormData.set("gestgsbase", localStorage.aor_gestgsbase);
                bodyFormData.set("aplgsbase", localStorage.aor_aplgsbase);
                bodyFormData.set("ejagsbase", localStorage.aor_ejagsbase);
                bodyFormData.set("puertogsbase", localStorage.aor_puertogsbase);
                //---
                bodyFormData.set("finicio", '01' + (this.months.indexOf(this.selected_month) + 1).toString().padStart(2, '0') + this.selected_year);
                bodyFormData.set("ffin", '01' + (this.months.indexOf(this.selected_month) + 1).toString().padStart(2, '0') + this.selected_year);

                // Send request
                axios({
                    method: "post",
                    url: WS_PATH + "get_planning_worker.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        //console.log(response.data);
                        // Preloader Off
                        this.$f7.dialog.close();

                        //var rd = Object.values(response.data);
                        //this.hours = rd.slice(0, 31);

                        // Set hours
                        this.hours = response.data;

                        // Remove unnecessary
                        delete this.hours.usuario_valido;
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            getNewDate(date) {
                var date = new Date(date);
                var newdate = new Date(date);

                newdate.setDate(newdate.getDate() + 30);

                return this.formatDate(newdate);
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
            }
        }
    };
</script>


<style scoped>
    .date p {
        height: 36px;
        line-height: 36px;
    }

    #picker-date,
    #picker-worker {
        background-color: #ffffff;
        text-align: center;
        height: 36px;
        border-radius: 6px;
        width: 100%;
    }

    .timeline-item-date {
        width: 100px;
    }

    .md #picker-date,
    .md #picker-worker {
         border: 1px solid #4b4b4b;
     }
</style>
