<template>
  <div>
    <nav>
      <div>
        <img src="~/static/icons/iconMolde.svg" alt="molde" />
        <h1>TRYOUT - Solicitação</h1>
      </div>
      <button @click="menu">
        <img src="~/static/icons/iconMenu.svg" alt="" />
      </button>
    </nav>

    <div class="noTransitionMenu" :class="{ transitionMenu }">
      <div class="heightAdmin">
        <div class="cardAdmin">
          <div class="menuAdmin">
            <div class="adminReport">
              <h3>Relatórios</h3>
              <ul>
                <li>
                  <a href="http://185.209.179.253:8300/" target="_blank">RRIM</a>
                </li>
                <li>
                  <!-- <NuxtLink :to="{ name: 'index' }">TRYOUT</NuxtLink> -->
                  <p>TRYOUT</p>
                </li>
                
              </ul>
            </div>
            <div class="adminOption">
              <h3>Opções</h3>
              <div class="icons" >
                <div class="icon">
                  <NuxtLink :to="{ name: 'index' }">TRYOUT - Solicitação</NuxtLink>
                </div>
                <div class="icon">
                    <NuxtLink to="emdesenvolvimento">TRYOUT - Relatorio</NuxtLink>
                </div>
              </div>
            </div>
            <div class="adminUser">
              <h3>Informações do usuário</h3>
              <p>Nome: {{this.$store.getters.getUser.nome_completo}}</p>
              <p>Matricula: {{this.$store.getters.getUser.matricula}}</p>
              <p>Cargo: {{this.$store.getters.getUser.cargo.descricao}}</p>
              <p>Nível de acesso: {{this.$store.getters.getUser.nivel_de_acesso.descricao}}</p>

              <button @click="showChange">Trocar Senha</button>
            </div>
            <ChangePassword
            v-if="showPassword"
            @showChangePassword="showChangePassword"
          />
          </div>
          <div class="containerExit">
            <div class="logout" @click="logout">
              <p>Sair</p>
              <img :src="iconExit" alt="" />
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
      iconExit: './icons/iconExit.svg',
      iconConfig: './icons/iconConfig.svg',
      iconConfirm: './icons/iconConfirm.svg',
      iconFile: './icons/iconFile.svg',
      showPassword: false,
    }
  },
  methods: {
    menu() {
      this.transitionMenu = !this.transitionMenu
    },
    showChange(){
      this.showPassword = !this.showPassword
    },
    logout(){
      document.cookie = "auth._token.local=false";
      document.cookie = "auth._token_expiration.local=false";
      window.location.replace('http://185.209.179.253:7800/login')
    },
    showChangePassword(){
      this.showPassword = false
    }
  }, 
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--negativeSpace);
  width: 100%;
  height: 10vh;
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
  }
}

.noTransitionMenu.transitionMenu {
  width: 100%;
  transition: 1.2s;
  margin-top: 0px;
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
        grid-template-columns: 1fr 4fr 1fr;
        padding: 2rem;
        gap: 2rem;
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
            font-size: 1.4rem;
            font-weight: 700;
            list-style: none;
            li {
              width: 100%;
              display: flex;
              border-bottom: 1px solid var(--gray);
              padding: 0.8rem 0;
              a {
                width: 100%;
                color: var(--blue);
              }
              p{
                color: var(--blue);
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
              color: var(--blue);
              img {
                width: 30px;
                height: 30px;
              }
            }
          }
        }
        @media(max-width:531px) {
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
