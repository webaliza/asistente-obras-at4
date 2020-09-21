<template>
  <input type="text" placeholder="Seleccionar..." readonly="readonly" :id="id">
</template>

<script>
export default {
  name: "Calendar",
  props: ["id"],
  mounted() {
    console.log('Mounted!')
    //this.myCalendar.destroy();
    this.displayCalendar();
    this.$$("#hours_form_calendar").on("click", e => {
      console.log("clicked");
    });
  },
  methods: {
    displayCalendar() {
      let myCalendar = this.$f7.calendar.create({
        inputEl: "#" + this.id,
        openIn: "auto",
        closeOnSelect: true,
        toolbar: true,
        toolbarCloseText: "Cerrar",
        dateFormat: "dd-mm-yyyy",
        monthNames: [
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
        dayNamesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        on: {
          closed: () => {
            this.$emit("change", myCalendar.getValue());
          }
        }
      });
    }
  }
};
</script>

<style scoped>
input {
  height: 40px;
  width: 100% !important;
}
</style>
