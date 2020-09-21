<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/hours-form" title="Asistente obras: calendario">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>


            <div id="calendar-inline-container"></div>


    </f7-page>
</template>

<script>
    export default {
        name: "CalendarPage",
        mounted() {
            var calendarInline = this.$f7.calendar.create({
                containerEl: '#calendar-inline-container',
                monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                dayNamesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                on: {
                    change: () => {
                        this.setDate(calendarInline.getValue());
                        this.$f7router.back();
                    }
                }
            });
        },
        methods: {
            setDate(payload) {
                if (payload == undefined) return;
                let rawDate = payload[0];
                let dd = String(rawDate.getDate()).padStart(2, "0");
                let mm = String(rawDate.getMonth() + 1).padStart(2, "0"); // January is 0!
                let yyyy = rawDate.getFullYear();
                this.$store.dispatch("setDateOfWork", dd + "-" + mm + "-" + yyyy);
            },
        }
    }
</script>

<style scoped>

</style>