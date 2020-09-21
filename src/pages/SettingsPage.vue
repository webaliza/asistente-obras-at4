<template>
    <f7-page>
        <f7-navbar title="Asistente obras: configuración" back-link></f7-navbar>

        <f7-block no-hairlines-md no-hairlines-ios>
            <f7-list>
                <f7-list-input
                        label="IP/URL"
                        type="text"
                        autocapitalize="off"
                        :value="ipgsbase"
                        @input="ipgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Gestora"
                        type="text"
                        autocapitalize="off"
                        :value="gestgsbase"
                        @input="gestgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Aplicación"
                        type="text"
                        autocapitalize="off"
                        :value="aplgsbase"
                        @input="aplgsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Ejercicio"
                        type="text"
                        autocapitalize="off"
                        :value="ejagsbase"
                        @input="ejagsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <f7-list-input
                        label="Puerto"
                        type="text"
                        autocapitalize="off"
                        :value="puertogsbase"
                        @input="puertogsbase = $event.target.value"
                        clear-button
                        required
                ></f7-list-input>

                <br>

                <f7-button text="GUARDAR" @click="saveSettings" fill large round raised></f7-button>
            </f7-list>
        </f7-block>

        <f7-block>
            <!-- Info -->
            <div class="alert alert-info">
                <div class="center">
                    <f7-icon material="info"></f7-icon>
                    <h3>Credenciales de prueba</h3>
                </div>
                <p><strong>Usuario:</strong> demo_obras</p>
                <p><strong>Contraseña:</strong> 1234</p>
            </div>
        </f7-block>

    </f7-page>
</template>

<script>
    export default {
        name: "SettingsPage",

        data() {
            return {
                ipgsbase: localStorage.aor_ipgsbase,
                gestgsbase: localStorage.aor_gestgsbase,
                aplgsbase: localStorage.aor_aplgsbase,
                ejagsbase: localStorage.aor_ejagsbase,
                puertogsbase: localStorage.aor_puertogsbase
            };
        },
        methods: {
            saveSettings() {
                // Save settings into Local Storage
                localStorage.aor_ipgsbase = this.ipgsbase;
                localStorage.aor_gestgsbase = this.gestgsbase;
                localStorage.aor_aplgsbase = this.aplgsbase;
                localStorage.aor_ejagsbase = this.ejagsbase;
                localStorage.aor_puertogsbase = this.puertogsbase;

                let notification = this.$f7.toast.create({
                    position: 'top',
                    text: "Configuración guardada",
                    icon: '<i class="icon material-icons">done</i>',
                    closeTimeout: 2000
                });
                notification.open();

                // Redirect to Settings Page
                setTimeout(() => {
                    this.$f7router.navigate("/login");
                }, 2000);
            }
        }
    };
</script>

<style scoped>
</style>


