<template>
  <f7-page>
    <f7-navbar title="Asistente obras: acceso"></f7-navbar>

    <f7-block inner>
      <f7-list form no-hairlines>
        <!-- USUARIO -->
        <f7-list-input
          type="text"
          label="Usuario"
          autocapitalize="off"
          :value="log_in.usuario"
          @input="log_in.usuario = $event.target.value"
        >
        </f7-list-input>

        <!-- PASSWORD -->
        <f7-list-input
          type="password"
          label="Contraseña"
          :value="log_in.contrasenya"
          @input="log_in.contrasenya = $event.target.value"
        >
        </f7-list-input>

        <f7-list-item>
          <label>Guardar datos</label>
          <f7-toggle
            @toggleChange="toggleStoreUserData"
            ref="toggle_user_data"
          ></f7-toggle>
        </f7-list-item>

        <br />

        <!-- SUBMIT -->
        <f7-button large fill round raised @click="do_login">Enviar</f7-button>

        <br />
      </f7-list>

      <hr />
      <br />

      <f7-link
        icon-f7="gear"
        text="Configuración gsBase"
        color="blue"
        href="/settings"
      ></f7-link>
    </f7-block>

    <!-- Version -->
    <div class="version">
      <small>v.3.0.1</small>
    </div>
  </f7-page>
</template>

<script>
import axios from "axios";
import { WS_PATH } from "../config.js";

export default {
  name: "LoginPage",
  props: [],
  data() {
    return {
      log_in: {
        usuario: "",
        contrasenya: ""
      }
    };
  },
  mounted() {
    // se recuperan los datos de acceso guardados
    if (localStorage.aor_uname !== undefined) {
      this.log_in.usuario = localStorage.aor_uname;
    }

    if (localStorage.aor_upass !== undefined) {
      this.log_in.contrasenya = localStorage.aor_upass;
    }

    if (localStorage.aor_ustore === "true") {
      this.$refs.toggle_user_data.toggle();
    }
  },
  methods: {
    toggleStoreUserData(e) {
      if (e === true) {
        localStorage.aor_uname = this.log_in.usuario;
        localStorage.aor_upass = this.log_in.contrasenya;
        localStorage.aor_ustore = "true";
      } else {
        localStorage.aor_uname = "";
        localStorage.aor_upass = "";
        localStorage.aor_ustore = false;
      }
    },
    do_login() {
      // Preloader On
      this.$f7.dialog.preloader("Accediendo...");

      let bodyFormData = new FormData();
      bodyFormData.set("usuario", this.log_in.usuario);
      bodyFormData.set("contrasenya", this.log_in.contrasenya);
      bodyFormData.set("ipgsbase", localStorage.aor_ipgsbase);
      bodyFormData.set("gestgsbase", localStorage.aor_gestgsbase);
      bodyFormData.set("aplgsbase", localStorage.aor_aplgsbase);
      bodyFormData.set("ejagsbase", localStorage.aor_ejagsbase);
      bodyFormData.set("puertogsbase", localStorage.aor_puertogsbase);

      axios({
        method: "post",
        url: WS_PATH + "login.php",
        data: bodyFormData,
        timeout: 15000
      })
        .then(response => {
          //console.log(response);
          // Preloader Off
          this.$f7.dialog.close();

          if (response.data.usuario_valido === "ok") {
            this.$store.dispatch("setUserName", this.log_in.usuario);
            this.$store.dispatch("setUserPass", this.log_in.contrasenya);
            this.$store.dispatch("setUserID", response.data.codigo_usuario);

            // Obtener y setear la lista de trabajadores
            let workers_list = JSON.parse(
              this.decodeEntities(JSON.stringify(response.data.ls_trabajadores))
            );
            this.$store.dispatch("setWorkersList", workers_list);

            // Obtener y setear la lista de trabajadores completa
            let workers_list_big = JSON.parse(
              this.decodeEntities(
                JSON.stringify(response.data.ls_completa_trabajadores)
              )
            );
            this.$store.dispatch("setWorkersListBig", workers_list_big);

            // Obtener y setear la lista de causas de incidencias
            let incidences_list = JSON.parse(
              this.decodeEntities(JSON.stringify(response.data.ls_incidencias))
            );
            this.$store.dispatch("setCausesList", incidences_list);

            // Navigate
            this.$f7router.navigate("/home");
          } else {
            this.$f7.dialog.alert("gsBase ha respondido KO", "Error");
          }
        })
        .catch(error => {
          //console.log(error);
          this.$f7.dialog.close();
          this.$f7.dialog.alert("No se ha podido conectar", "Error");
        });
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
        .replace(translate_re, function(match, entity) {
          return translate[entity];
        })
        .replace(/&#(\d+);/gi, function(match, numStr) {
          var num = parseInt(numStr, 10);
          return String.fromCharCode(num);
        });
    }
  }
};
</script>

<style scoped>
.version {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
