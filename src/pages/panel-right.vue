<template>
    <f7-page>
        <f7-navbar title="Menú"></f7-navbar>

        <f7-list>
            <f7-list-item link="/home" title="Inicio" view="#main-view" panel-close></f7-list-item>
            <f7-list-item link="/hours-form" title="Nuevo parte" view="#main-view" panel-close></f7-list-item>
            <f7-list-item link="/planning" title="Planning" view="#main-view" panel-close></f7-list-item>
            <f7-list-item link="/history" title="Histórico de fichajes" view="#main-view" panel-close></f7-list-item>
            <f7-list-item link="/login" title="Salir" view="#main-view" panel-close></f7-list-item>
        </f7-list>

    </f7-page>
</template>
<script>
    export default {}
</script>