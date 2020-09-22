<template>
  <f7-page class="cover">
    <f7-block>
      <p>
        Asistente para obras y reformas:
        <br />
        <strong>partes de horas</strong>
      </p>
      <div class="logo">
        <img src="../assets/logo_AT4_1024.png" />
      </div>
    </f7-block>
    <f7-toolbar no-shadow no-hairline position="bottom">
      <p>&copy; 2020 AT4</p>
    </f7-toolbar>
  </f7-page>
</template>

<script>
export default {
  name: "InitPage",
  mounted() {
    if (localStorage.aor_ipgsbase === undefined)
      localStorage.aor_ipgsbase = "grupoat4.dyndns.org";
    if (localStorage.aor_gestgsbase === undefined)
      localStorage.aor_gestgsbase = "at4";
    if (localStorage.aor_aplgsbase === undefined)
      localStorage.aor_aplgsbase = "ay_at4";
    if (localStorage.aor_ejagsbase === undefined)
      localStorage.aor_ejagsbase = "eja";
    if (localStorage.aor_puertogsbase === undefined)
      localStorage.aor_puertogsbase = "8121";

    setTimeout(() => {
      this.$f7router.navigate("/login");
    }, 2000);
  }
};
</script>

<style scoped>
.cover {
  background-color: #ffffff !important;
  font-size: 18px !important;
  text-align: center;
}

.cover p {
  color: #222222 !important;
}

.logo img {
  width: 100%;
}

.toolbar p {
  width: 100%;
  color: #ffffff !important;
}
</style>
