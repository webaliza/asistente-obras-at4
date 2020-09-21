<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link title="Asistente obras: modificar fichaje">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>

            <!-- SignIn info -->
            <f7-row>
                <f7-col><h3>{{ time }}</h3></f7-col>
                <f7-col><h3 style="text-align: center;">{{ concept }}</h3></f7-col>
                <f7-col><h3 style="text-align: right;">{{ reverseDate(date) }}</h3></f7-col>
            </f7-row>

            <!-- New time -->
            <f7-row class="new-time">
                <f7-col width="25">
                    <p for="picker-time">Nueva hora: </p>
                </f7-col>
                <f7-col width="75">
                    <p>
                        <input
                                type="text"
                                :value="new_time"
                                readonly="readonly"
                                id="picker-time"
                                @change="new_time = $event.target.value"
                        >
                    </p>
                </f7-col>
            </f7-row>

            <!-- Comments -->
            <f7-row>
                <f7-col>
                    <p>Observaciones:</p>
                </f7-col>
            </f7-row>
            <f7-row>
                <f7-col>
                    <f7-input
                            id="comments-txta"
                            type="textarea"
                            :value="comments"
                            @input="comments = $event.target.value"
                            resizable></f7-input>
                </f7-col>
            </f7-row>

            <!-- Cause -->
            <f7-row>
                <f7-col>
                    <p>Causa de la incidencia:</p>
                </f7-col>
            </f7-row>
            <f7-row>
                <f7-col>
                    <input
                            type="text"
                            :value="cause_description"
                            readonly="readonly"
                            id="picker-cause"
                            @change="cause_description = $event.target.value"
                    >
                </f7-col>
            </f7-row>


            <!-- Submit -->
            <f7-row>
                <p>&nbsp;</p>
                <f7-col>
                    <f7-button
                            fill
                            large
                            raised
                            @click="sendModification">Actualizar
                    </f7-button>
                </f7-col>
            </f7-row>

        </f7-block>

    </f7-page>

</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config.js";
    import {mapGetters} from "vuex";

    export default {
        name: "ModifySignInPage",
        props: [
            'code',
            'date',
            'time',
            'concept',
        ],
        data() {
            return {
                hour: null,
                minute: null,
                new_time: '',
                comments: '',
                cause_code: 0,
                cause_description: '',
            }
        },
        computed: {
            ...mapGetters(["getUserName", "getUserID", "getUserPass", "getCausesList"])
        },
        mounted() {

            let timeArray = this.time.split(':');
            this.hour = timeArray[0];
            this.minute = timeArray[1];

            var picker = this.$f7.picker.create({
                inputEl: "#picker-time",
                rotateEffect: true,
                scrollToInput: true,
                momentumRatio: 14,
                toolbar: true,
                toolbarCloseText: "Hecho",
                formatValue: function (values, displayValues) {
                    return values[0] + ":" + values[1];
                },
                cols: [
                    {
                        values: "00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23".split(" ")
                    },
                    {
                        divider: true,
                        content: ":"
                    },
                    {
                        values: "00 05 10 15 20 25 30 35 40 45 50 55".split(" ")
                    }
                ],
                on: {
                    open: (picker) => {
                        console.log(this.hour)
                        picker.setValue([this.hour, this.minute])
                    },
                    change: (picker) => {
                        this.new_time = picker.value[0]
                    }
                }
            });

            var picker = this.$f7.picker.create({
                inputEl: "#picker-cause",
                rotateEffect: true,
                scrollToInput: true,
                toolbar: false,
                momentumRatio: 14,
                toolbar: true,
                toolbarCloseText: "Hecho",
                cols: [
                    {
                        textAlign: "left",
                        values: this.getCausesList[1]
                    }
                ],
                on: {
                    change: (picker) => {
                        let index = this.getCausesList[1].indexOf(picker.value[0])
                        this.cause_code = this.getCausesList[0][index]
                    }
                }
            });
        },
        methods: {

            sendModification() {

                // Validar la existencia de datos
                if (
                    this.new_time === '' &&
                    this.comments === '' &&
                    this.cause_code == 0
                ) {
                    this.$f7.dialog.alert("Rellene algún dato", "Atención");
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
                bodyFormData.set("cod_fichaje", this.code);
                bodyFormData.set("hora", this.new_time);
                bodyFormData.set("observaciones", this.comments);
                bodyFormData.set("cod_incidencia", this.cause_code);

                // Send request
                axios({
                    method: "post",
                    url: WS_PATH + "update_fichaje.php",
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.usuario_valido === "ok") {

                            let notification = this.$f7.toast.create({
                                position: "top",
                                text: response.data.texto_msg,
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();

                            // Redirect to History Page
                            setTimeout(() => {
                                this.$f7router.navigate("/history");
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
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha obtenido respuesta del servidor", "Error");
                    });
            },
            reverseDate(payload) {
                if (payload === undefined || payload === null) {
                    return;
                }
                let date = payload.split("-");
                return date.reverse().join("-");
            },
        }
    }
</script>

<style scoped>
    .new-time p {
        height: 36px;
        line-height: 36px;
    }

    #picker-time {
        background-color: #ffffff;
        text-align: center;
        height: 36px;
        border-radius: 6px;
    }

    #picker-cause {
        background-color: #ffffff;
        text-align: center;
        height: 36px;
        border-radius: 6px;
        width: 100%;
    }

    #comments-txta {
        background-color: #ffffff;
        border-radius: 6px;
        padding: 10px;
        width: initial !important;
    }

    .md #picker-time,
    .md #picker-cause,
    .md #comments-txta {
        border: 1px solid #4b4b4b;
    }
</style>