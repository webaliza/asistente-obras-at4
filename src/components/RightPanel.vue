<template>
  <!-- Right Panel with Cover effect and dark layout theme -->
  <f7-panel right theme-dark>
    <!-- <f7-view> -->
    <f7-page>
      <f7-block>
        <f7-list>
          <f7-list-item>
            <h3>Navegación</h3>
          </f7-list-item>
          <f7-list-item link="/hours-form" title="Partes" panel-close></f7-list-item>
          <f7-list-item link="/planning" title="Planning" panel-close></f7-list-item>
          <f7-list-item link="/login" title="Salir" panel-close></f7-list-item>
        </f7-list>
      </f7-block>
    </f7-page>
    <!-- </f7-view> -->
  </f7-panel>
</template>

<script>
export default {
  name: "RightPanel"
};
</script>

<style scoped>
</style>


