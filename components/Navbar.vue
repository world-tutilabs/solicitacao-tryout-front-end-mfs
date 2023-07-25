<template>
  <div>
    <nav>
      <div>
        <!-- <img src="~/static/icons/iconMolde.svg" alt="molde" /> -->
        <a
          class="buttonBack"
          value="menuSistemas"
          href="http://185.209.179.253:7800/"
        >

        </a>
        <h3>Solicitação de TryOut</h3>
      </div>

      <div style="display: flex; align-items: center">
        <span style="font-size: 0.6rem">Versão 1.2.1</span>
        <button @click="menu">
          <img src="~/static/icons/iconMenu.svg" alt="" />
        </button>
      </div>
    </nav>

    <div class="noTransitionMenu" :class="{ transitionMenu }">
      <div class="heightAdmin">
        <div class="cardAdmin">
          <div class="menuAdmin">
            <div class="adminReport">
              <h3>Sistemas</h3>
              <ul>
                <li>
                  <a href="http://185.209.179.253:8300/" target="_blank"
                    >RRIM</a
                  >
                </li>
                <li>
                  <a href="http://185.209.179.253:8500/" target="_blank"
                    >Solicitação de TryOut</a
                  >
                </li>
                <li>
                  <a href="http://185.209.179.253:9200/" target="_blank"
                    >Relatório de TryOut</a
                  >
                </li>
                <li>
                  <a href="http://185.209.179.253:9007/" target="_blank"
                    >FIT - Ficha de Instrução de Trabalho</a
                  >
                </li>
                <li>
                  <a href="http://185.209.179.253:7701/" target="_blank">FTI - Ficha Técnica de Injeção</a>
                </li>
              </ul>
            </div>
            <div class="adminUser">
              <h3>Informações do usuário</h3>
              <p>
                <strong>Nome:</strong>
                {{ $store.state.isUser.data.user.nome_completo }}
              </p>
              <p>
                <strong>Matricula:</strong>
                {{ $store.state.isUser.data.user.matricula }}
              </p>
              <p>
                <strong>Email:</strong>
                {{ $store.state.isUser.data.user.email }}
              </p>
              <p>
                <strong>Cargo:</strong>
                {{ $store.state.isUser.data.user.cargo.descricao }}
              </p>
              <p>
                <strong>Nível de Acesso:</strong>
                {{ $store.state.isUser.data.user.nivel_de_acesso.descricao }}
              </p>

              <!-- <button style="padding: 10px; border-radius: 4px" @click="showChange">
                Trocar Senha
              </button> -->
            </div>
            <ChangePassword
              v-if="showPassword"
              @showChangePassword="showChangePassword"
            />
          </div>
          <div class="containerExit">
            <div class="logout" @click="logout">
              <p>Sair</p>
              <!-- <img :src="iconExit" alt="" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionMenu: false,
      showPassword: false,
    };
  },
  methods: {
    menu() {
      this.transitionMenu = !this.transitionMenu;
    },
    showChange() {
      this.showPassword = !this.showPassword;
    },
    logout() {
      document.cookie = "auth._token.local=false";
      document.cookie = "auth._token_expiration.local=false";
      window.location.replace("http://185.209.179.253:7800/login");
    },
    showChangePassword() {
      this.showPassword = false;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--negativeSpace);
  width: 100%;
  height: 7vh;
  position: fixed;
  top: 0;
  z-index: 9;
  background: var(--green);
  div {
    display: flex;
    gap: 1rem;
    color: var(--white);
  }
  button {
    background: none;
    img {
      transition: 0.5s;
    }
    img:hover {
      transform: rotate(225deg);
    }
  }

  .buttonBack {
    width: 2.5rem;
    height: 2rem;
    background: url("../static/icons/home.png");
    background-repeat: no-repeat;
  }
}
.noTransitionMenu.transitionMenu {
  width: 100%;
  transition: 1.2s;
  margin-top: 0;
  background: rgba(149, 164, 167, 0.178);
  backdrop-filter: blur(15px);
  z-index: 3;
}
.noTransitionMenu {
  display: flex;
  width: 100%;
  transition: 1.2s;
  background: rgba(149, 164, 167, 0.178);
  backdrop-filter: blur(15px);
  margin-top: -100vh;
  position: fixed;
  z-index: 3;
  .heightAdmin {
    height: 100vh;
    width: 100%;
    .cardAdmin {
      width: 100%;
      position: relative;
      background-color: var(--white);
      .menuAdmin {
        position: relative;
        width: 100%;
        display: grid;
        grid-template-columns: 5fr 1fr;
        padding: 2rem;
        gap: 2rem;
        .adminUser {
          p,
          button {
            margin-top: 10px;
          }
        }
        .adminReport,
        .adminOption {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border-right: 1px solid var(--gray);
          padding: 0 1rem;
          ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 1.2rem;
            font-weight: 500;
            list-style: none;
            li {
              width: 100%;
              display: flex;
              // border-bottom: 1px solid var(--gray);
              padding: 0.8rem 0;
              a {
                width: 100%;
                color: var(--black_text);
                transition: 0.1s;
              }
              a:hover {
                font-weight: 600;
              }
              p {
                color: var(--black_text);
                cursor: pointer;
                width: 100%;
              }
            }
          }
        }
        .adminOption {
          .icons {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            .icon {
              display: flex;
              align-items: center;
              gap: 2rem;
              color: var(--blue_base);
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
        @media (max-width: 531px) {
          grid-template-columns: 1fr;
        }
      }
      .containerExit {
        width: 100%;
        display: flex;
        justify-content: end;
        border-top: 1px solid var(--gray);
        padding: 1rem;
        .logout {
          position: relative;
          right: 6rem;
          display: flex;
          gap: 0.7rem;
          cursor: pointer;
          p {
            color: #18a0fb;
            font-weight: bold;
          }
          img {
            width: 2rem;
          }
        }
      }
    }
  }
}
@media (max-width: 425px) {
  .noTransitionMenu {
    .heightAdmin {
      .cardAdmin {
        .menuAdmin {
          gap: 0;
          padding: 0.5rem;
          overflow: scroll;
          justify-items: center;
          .adminOption,
          .adminReport {
            align-items: center;
          }
          .adminUser {
            padding: 0 1rem;
          }
          .adminOption {
            .icons {
              grid-template-columns: 1fr;
              .icon {
                gap: 0.5rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
