<template>
  <div class="container">
    <form @submit.prevent="change_password">
      <h1>Nova senha</h1>
      <div class="inputs">
        <input :type="statusPassword" v-model="newPassword" />
        <button type="button" @click="showPassword" class="btnEyes">
          <img
            :src="textButtonPassword == 'aberto' ? olhoAberto : olhoFechado"
            alt=""
          />
        </button>
      </div>

      <button type="submit">Salvar</button>
      <button type="button" @click="showChangePassword" class="exit">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import http from "../../services/users/index";
import olhoAberto from "@/assets/img/eyes.svg";
import olhoFechado from "@/assets/img/eyes2.svg";

export default {
  data() {
    return {
      newPassword: "",
      statusPassword: "password",
      textButtonPassword: "fechado",
      olhoAberto,
      olhoFechado,
    };
  },
  methods: {
    showPassword() {
      if (this.statusPassword === "password") {
        this.statusPassword = "text";
        this.textButtonPassword = "aberto";
        return;
      }
      this.statusPassword = "password";
      this.textButtonPassword = "fechado";
      return;
    },
    showChangePassword() {
      this.newPassword = "";
      this.$emit("showChangePassword");
    },
    async change_password() {
      if (!this.newPassword) {
        this.$toast.warning("Digite uma senha");
        return;
      }

      if (this.newPassword.length < 6) {
        this.$toast.warning("Digite uma senha com no minimo 5 digitos");
        return;
      }
      try {
        await http.changePassword(this.newPassword).then( (res) => {
            this.newPassword = "";
            this.statusPassword = "password";
            this.textButtonPassword = "fechado";
            this.$emit("showChangePassword");
            this.$toast.success("Senha alterada com sucesso!");
        }).catch( (error) => {
            this.$toast.error(`Erro: ${error}`);
        });
        
      } catch (error) {
        this.$toast.error(`Erro: ${error}`);
      }
    },
  },
};
</script>

<style scoped>
.inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btnEyes {
  background: none;
  height: 2rem;
  padding: 0;
}
.btnEyes img {
  height: 100%;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  width: 100%;
  height: 100vh;
  background: rgba(141, 141, 214, 0.548);
  backdrop-filter: blur(5px);

  display: grid;
  justify-content: center;
  align-content: center;
}

form {
  margin: 0 auto;
  padding: 1rem;
  background: #ffffff;
  display: grid;
  gap: 1rem;
  height: fit-content;
}
input {
  font-size: 1.2rem;
  padding: 0.2rem;
}
button {
  background: var(--blue);
  color: #ffffff;
  padding: 0.5rem;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.exit {
  background: #d5d5d5;
  color: #222222;
}
</style>