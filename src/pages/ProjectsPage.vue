<template>
    <f7-page>
        <f7-navbar back-link back-link-force back-link-url="/hours-form" title="Asistente obras: obras">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block no-hairlines>
            <f7-list>
                <f7-list-item
                        v-for="(value, key, index) in getProjects"
                        :key="index"
                        :title="value[0]"
                        :footer="value[2]"
                        @click="selectProject($event, key)"
                ></f7-list-item>
                <!--
                <f7-list-item
                  v-for="(value, key, index) in getProjects"
                  :key="index"
                  @click="selectProject($event, key)"
                >{{ value[0] }}</f7-list-item>
                -->
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import axios from "axios";
    import {mapGetters, mapActions} from "vuex";
    import {WS_PATH} from "../config.js";

    export default {
        name: "ProjectsPage",
        computed: {
            ...mapGetters(["getUserName", "getUserPass", "getProjects"])
        },
        mounted() {
            // Preloader On
            this.$f7.dialog.preloader("Buscando...");

            let bodyFormData = new FormData();
            bodyFormData.set("usuario", this.getUserName);
            bodyFormData.set("contrasenya", this.getUserPass);
            bodyFormData.set("ipgsbase", localStorage.aor_ipgsbase);
            bodyFormData.set("gestgsbase", localStorage.aor_gestgsbase);
            bodyFormData.set("aplgsbase", localStorage.aor_aplgsbase);
            bodyFormData.set("ejagsbase", localStorage.aor_ejagsbase);
            bodyFormData.set("puertogsbase", localStorage.aor_puertogsbase);

            axios({
                method: "post",
                url: WS_PATH + "get_obras.php",
                data: bodyFormData
            })
                .then(response => {
                    // Preloader Off
                    this.$f7.dialog.close();

                    if (response.data.usuario_valido === "ok") {
                        let decoded = this.decodeEntities(JSON.stringify(response.data));

                        // Se modifica el estado
                        this.$store.dispatch("setProjects", JSON.parse(decoded));
                    } else {
                        this.$f7.dialog.alert("No ha sido posible recuper las obras de gsBase", "Error");
                    }
                })
                .catch(function (error) {
                    //console.log(error);
                });
            '0'
        },
        methods: {
            selectProject($event, code) {
                // Set project code in store
                this.$store.dispatch("setCurrentProjectCode", code);
                // Delete possible previous chapter and entry codes
                this.$store.dispatch("setCurrentChapterCode", null);
                this.$store.dispatch("setCurrentEntryCode", null);

                // Go to chapters page
                this.$f7router.navigate("/chapters");
            },
            decodeEntities(encodedString) {
                var translate_re = /&(aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde);/g;
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
                    Ntilde: "Ñ"
                };
                return encodedString
                    .replace(translate_re, function (match, entity) {
                        return translate[entity];
                    })
                    .replace(/&#(\d+);/gi, function (match, numStr) {
                        var num = parseInt(numStr, 10);
                        return String.fromCharCode(num);
                    });
            }
        }
    };
</script>

<style scoped>
</style>