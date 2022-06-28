<template>
  <div class="containerFilter">
    <div class="containerModal">
      <header>
        <div>
          <h1>Revisão PCP</h1>
          <p>Informações Gerais</p>
        </div>
        <img src="~/static/icons/x.svg" alt="" />
      </header>

      <form action="">
        <!-- modificacao e testes -->
        <div class="rowInputs">
          <div class="boxInput">
            <FormInput
              label="Código SAPP"
              v-model="codSapp"
              readonly="readonly"
            />
          </div>
        </div>

        <div class="rowInputs">
          <div class="boxInput">
            <FormInput
              label="Código do Produto"
              v-model="codProduct"
              readonly="readonly"
            />
          </div>
          <div class="boxInput">
            <FormInput
              label="Descrição do Produto"
              v-model="descProduct"
              readonly="readonly"
            />
          </div>
          <div class="boxInput">
            <FormInput label="Cliente" v-model="client" readonly="readonly" />
          </div>
          <div class="boxInput">
            <FormInput label="Motivo" v-model="reason" readonly="readonly" />
          </div>
        </div>

        <!-- so aparece quando selecionar um processo -->
        <div class="containerProcess">
          <div class="tabs">
            <div class="tab">
              <p>Processo Injeção</p>
              <img src="~/static/icons/x.svg" alt="" />
            </div>
          </div>
          <div class="frameProcess">
            <div class="typeProcess">
              <h2>Processo Injeção</h2>
              <div class="rowInputs">
                <div class="boxInput">
                  <FormInput
                    label="Técnico"
                    v-model="technician"
                    readonly="readonly"
                  />
                </div>
                <div class="boxInput">
                  <FormInput
                    label="Quantidade"
                    v-model="amount"
                    readonly="readonly"
                  />
                </div>
                <div class="boxInput">
                  <FormInput
                    label="Motivo"
                    v-model="reason"
                    readonly="readonly"
                  />
                </div>
                <div class="boxInput">
                  <FormInput
                    label="Data Programada"
                    v-model="date_scheduled"
                    readonly="readonly"
                  />
                </div>
              </div>
            </div>
            <div class="cardTryOut">
              <!-- components aqui com props -->
              <SlotCardVue>
                <Title title="Mão de Obra" />
                <FormInput
                  label="Descrição"
                  v-model="descriptionLabor"
                  readonly="readonly"
                />
                <FormInput
                  label="Qtd"
                  v-model="amountLabor"
                  readonly="readonly"
                />
              </SlotCardVue>

              <SlotCardVue>
                <Title title="Molde" />
                <FormInput
                  label="Descrição"
                  v-model="descriptionMold"
                  readonly="readonly"
                />
                <FormInput
                  label="Qtd"
                  v-model="amountMold"
                  readonly="readonly"
                />
              </SlotCardVue>

              <SlotCardVue>
                <Title title="Matéria Prima" />
                <FormInput
                  label="Descrição"
                  v-model="descriptionFeedstock"
                  readonly="readonly"
                />
                <FormInput
                  label="Qtd"
                  v-model="amountFeedstock"
                  readonly="readonly"
                />
              </SlotCardVue>
            </div>
          </div>
        </div>

        <FormTextAreaVue title="Comentários*" v-model="textoTextArea" />

        <div class="boxButtons">
          <p>*Campo Obrigatório</p>
          <div>
            <button class="cancel">Reprovar</button>
            <button class="save">Aprovar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      descriptionLabor: '',
      textoTextArea: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.containerFilter {
  height: 100vh;
  position: fixed;
  background: rgba(249, 249, 249, 0.2666666667);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  left: 0;
  width: 100%;
  top: 0;
  z-index: 9;
  overflow-y: scroll;
  padding: 1rem;

  .containerModal {
    width: 60rem;
    margin: auto;
    background-color: var(--bg);
    padding: 1vw;
    border-radius: 0.5rem;

    header {
      p {
        color: var(--green);
        font-weight: var(--bold);
      }
      border-bottom: 0.2rem solid var(--gray);
      padding-bottom: 1vw;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .rowInputs {
      display: flex;
      gap: 1rem;
      padding: 0 0.5rem;
      .boxInput {
        p {
          font-size: 0.8rem;
          font-weight: var(--bold);
        }
      }
    }

    form {
      display: grid;
      gap: 2rem;

      .boxButtons {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        button {
          font-size: 1rem;
          width: 7rem;
          padding: 0.5rem 0.7rem;
          border-radius: 1rem;
          font-weight: var(--bold);
        }
        .save {
          background-color: var(--blue);
          color: var(--white);
        }
        .cancel {
          color: var(--white);
          background-color: var(--orange);
        }
      }
    }
    .containerProcess {
      .tabs {
        display: flex;
        align-items: flex-end;
        height: 3.5rem;
        .tab {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          min-width: 10rem;
          height: 3rem;
          padding: 0.7rem 0.5rem;
          font-size: 1rem;
          font-weight: var(--bold);
          border-radius: 0.5rem 0.5rem 0 0;
          background-color: var(--bgProcess);
          border: 2px solid var(--bgProcess);
          transition: 0.2s;

          &:hover {
            height: 3.5rem;
          }

          img {
            width: 0.7rem;
          }
        }
      }

      .frameProcess {
        width: 100%;
        padding: 1rem;
        background-color: var(--bgProcess);
        .typeProcess {
          margin-bottom: 0.8rem;
          border-bottom: 2px solid var(--gray_text);
        }
        .cardTryOut {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
      }
    }
  }
}
</style>
