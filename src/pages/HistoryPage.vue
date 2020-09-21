<template>
    <f7-page @page:afterin="retrieveData">

        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home">
            <f7-nav-title>Histórico de fichajes</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <!-- Content -->
        <!--
            Additional "timeline-horizontal" class to enable Horizontal timeline
            Additional "col-50" to define column width (50%)
            Additional "tablet-20" to define column width for tablets (20%)
        -->
        <div class="timeline timeline-horizontal col-50 tablet-20">
            <!-- Timeline Item (Day) -->
            <div class="timeline-item" v-for="(fecha, index) in lista_fechas" :key="index">
                <div class="timeline-item-date">{{ getHistory[fecha][0] }}</div>
                <div class="timeline-item-content">
                    <div class="timeline-item-inner" v-for="(value, key, index) in getHistory[fecha][1]" :key="index">
                        <div @click="goToModify(fecha, ...value)">
                            <div class="timeline-item-time">{{ value[1] }}</div>
                            <div class="timeline-item-title">{{ value[2] }}</div>
                            <div class="timeline-item-subtitle">{{ value[3] }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--
                <f7-sheet class="sheet" ref="appointment_sheet" @sheet:closed="sheetOpened = false">
                    <f7-toolbar>
                        <div class="left"></div>
                        <div class="right">
                            <f7-link sheet-close>Cerrar</f7-link>
                        </div>
                    </f7-toolbar>
                    <!-- Scrollable sheet content --><!--
            <f7-page-content>
                <f7-block>
                    <h3></h3>
                    <p>

                    </p>
                    <br>
                    <f7-button large raised fill :href="'/cancel-schedule/' + appointmentCode" sheet-close>ANULAR CITA</f7-button>
                </f7-block>
            </f7-page-content>
        </f7-sheet>
-->

    </f7-page>
</template>

<script>
    import axios from "axios";
    import {WS_PATH} from "../config";
    import {mapGetters} from "vuex";

    export default {
        name: "HistoryPage",
        data() {
            return {
                lista_fechas: []
            }
        },
        computed: {
            ...mapGetters([
                "getUserName",
                "getUserID",
                "getUserPass",
                'getHistory'
            ])
        },
        methods: {
            retrieveData() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");

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

                axios({
                    method: "post",
                    url: WS_PATH + 'get_hfichajes.php',
                    data: bodyFormData,
                    timeout: 15000
                })
                    .then(response => {
                        //console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.usuario_valido === "ok") {

                            // Set state
                            let history = JSON.parse(
                                this.decodeEntities(JSON.stringify(response.data.hfichajes))
                            );
                            this.$store.dispatch('setHistory', history);

                            this.lista_fechas = response.data.lista_fechas;

                        } else {
                            this.$f7.dialog.alert("gsBase ha respondido con un error", "Error");
                        }
                    })
                    .catch(error => {
                        //console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha obtenido respuesta del servidor", "Error");
                    });
            },
            goToModify(date, code, time, concept, other) {

                this.$f7router.navigate('/modify-sign-in/' + code + '/' + date + '/' + time + '/' + concept + '/');
            },
            decodeEntities(encodedString) {
                var translate_re = /&(aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde|ordm|ordf);/g;
                var translate = {
                    aacute: "á",
                    eacute: "é",
                    iacute: "í",
                    oacute: "ó",
                    uacute: "ú",
                    ntilde: "ñ",
                    Aacute: "Á",
                    Eacute: "É",
                    Iacute: "Í",
                    Oacute: "Ó",
                    Uacute: "Ú",
                    Ntilde: "Ñ",
                    ordm: "º",
                    ordf: "ª"
                };
                return encodedString
                    .replace(translate_re, function (match, entity) {
                        return translate[entity];
                    })
                    .replace(/&#(\d+);/gi, function (match, numStr) {
                        var num = parseInt(numStr, 10);
                        return String.fromCharCode(num);
                    });
            },
        }
    };
</script>

<style scope>
    .timeline-item-inner {
        background: #f7f7f8;
    }
</style>