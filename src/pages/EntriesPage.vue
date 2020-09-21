<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/hours-form" title="Asistente obras: partidas">
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block no-hairlines>
            <h3
                    class="project-name"
            >{{ getProjects[getCurrentProjectCode][0] }} / {{
                getProjects[getCurrentProjectCode][1][getCurrentChapterCode][0] }}</h3>

            <f7-list>
                <f7-list-item
                        v-for="(value, key, index) in getProjects[getCurrentProjectCode][1][getCurrentChapterCode][1]"
                        :key="index"
                        @click="selectEntry($event, key)"
                >{{ value }}
                </f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "EntriesPage",
        computed: {
            ...mapGetters([
                "getProjects",
                "getCurrentProjectCode",
                "getCurrentChapterCode"
            ])
        },
        methods: {
            selectEntry($event, code) {

                // Set chapter code in store
                this.$store.dispatch("setCurrentEntryCode", code);

                // Go to home page
                this.$f7router.navigate("/hours-form");
            }
        }
    };
</script>

<style scoped>
    .project-name {
        text-align: center;
        padding: 6px 12px;
    }
</style>


