<template>
  <div class="calendar-content">
    <div class="btn"><ToBackButton /></div>
    <div class="calendar-container">
      <div class="calendar">
        <div class="legend">
          <span class="span-today"
            ><img src="~/static/icons/check.svg" alt="" /> Hoje</span
          >
          <span class="span-late"
            ><img src="~/static/icons/late.svg" alt="" /> Atrasado</span
          >
          <span class="span-todo"
            ><img src="~/static/icons/clock.svg" alt="" />Programado</span
          >
        </div>
        <no-ssr>
          <v-date-picker
            mode="range"
            v-model="date"
            show-caps
            is-expanded
            title-position="left"
            :attributes="attrs"
          />
          <template #day-popover>
            <div>programado</div>
          </template>
        </no-ssr>

        <div class="contentCount">
          <h4>Mês: {{ newDateMonth(date) }}</h4>

          <h5>
            Atrasados:
            <span :class="{ programmed_retard }">{{
              programmedRetard(date)
            }}</span>
          </h5>
          <h5>Programados: {{ tryoutProgrammed(date) }}</h5>
        </div>
      </div>

      <div class="list-content">
        <header>
          <h1>Data: {{ newDate(date) }}</h1>
        </header>

        <div class="cards">
          <div v-for="(mold, index) in dataNewMold" :key="index">
            <div
              class="cardCalendar"
              v-if="newDate(date) === newDateCard(mold.programmed_date)"
            >
              <CardModel :dataMold="mold" :typeCard="'solicitation'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import serviceNewMold from "~/services/newMold/mold";
export default {
  layout: "calendar",
  head() {
    return {
      title: "TryOut - Kanban",
    };
  },
  data() {
    return {
      dataExample: [],
      attrs: [],
      date: new Date(),
      programmed_retard: true,
      dataNewMold: [],
    };
  },

  created: async function () {
    const values = await serviceNewMold.listAllHistoric();

    const SolicitationApproved = values.data.filter((solicitation) => {
      return solicitation.homologation.status.description === "Aprovado";
    });
    this.newDateProgammed(SolicitationApproved);
    this.dataNewMold = SolicitationApproved;
    // if(SolicitationApproved.length !== 0){

    // }
  },

  methods: {
    // funcao que verifica as cores da legenda
    newDateProgammed(valor) {
      let date2;
      let date1;

      for (const date of valor) {
        date1 = dayjs(new Date());
        date2 = dayjs(date.programmed_date).add(1, "day");
        const color_date = date2.diff(date1, "days", true).toFixed();
        if (color_date > 0) {
          this.attrs.push({
            key: "today",
            bar: "green",
            dates: new Date(date2),
          });
        } else if (color_date == 0) {
          this.attrs.push({
            key: "today",
            bar: "blue",
            dates: new Date(date2),
          });
        } else {
          this.attrs.push({ key: "today", bar: "red", dates: new Date(date2) });
        }
      }
    },

    // funcao que retorna a data do Tryout programado
    newDateCard(valor) {
      return dayjs(valor).add(1, "day").format("DD/MM/YYYY");
    },

    // funcao que retorna a data clicada
    newDate(valor) {
      const data = dayjs(valor).format("DD/MM/YYYY");
      return data;
    },

    // funcao que retorna o mês clicado
    newDateMonth(date) {
      const dateCurrent = dayjs().format("MM");
      const dateMounth = dayjs(date).format("MM");
      if (dateMounth == dateCurrent) {
        return dateCurrent;
      } else {
        return dateMounth;
      }
    },

    // funcao que retorna quantos tryouts tem programados no mês
    tryoutProgrammed(date) {
      const dateCurrent = dayjs().format("MM/YYYY");
      const clickDate = dayjs(date).format("MM/YYYY"); // pega o click do mês e ano
      const listMountYear = []; // lista os meses das data programadas
      const getTryout = []; // lista os meses das datas programadas de acordo com a variavel "clickDate"

      // adiciona as das datas programadas vindas do JSON na variavel listMountYear, tendo como referencia o mês e ano
      this.dataNewMold.map((e) => {
        listMountYear.push(dayjs(e.programmed_date).format("MM/YYYY"));
      });

      // adiciona os meses das datas programadas na variavel "getTryout" de acordo com a variavel "clickDate", tendo como referencia o mês e ano
      listMountYear.map((e) => {
        if (clickDate === e) {
          getTryout.push(e);
        }
      });

      // faz a comparacao dos meses em relação ao clique de cada mês
      if (clickDate === dateCurrent) {
        return `${getTryout.length} Tryout Programado no mês`;
      } else if (clickDate > dateCurrent) {
        return `${getTryout.length} Tryout Programado no mês`;
      } else if (clickDate < dateCurrent) {
        return `${getTryout.length} Tryout Programado no mês`;
      }
    },

    // funcao que retorna quantos tryouts tem atrasados no mês
    programmedRetard(date) {
      const dateCurrent = dayjs().get("M"); // pega data atual que tem como referencia o mês
      const clickDate = dayjs(date).get("M"); // pega data do clique que tem como referencia o mês
      const arrayDateProgrammed = []; // array das datas programadas
      const arrayDateCurrent = []; // array das datas atrasadas, que tem como referencia o mês e sendo filtrada atraves da variavel "clickDate"
      const arrayDateCurrentMounth = []; // array das datas atrasadas por mês

      // adiciona as datas programadas vinda do JSON => na variavel arrayDateProgrammed
      this.dataNewMold.map((e) => {
        arrayDateProgrammed.push(dayjs(e.programmed_date).add(1, "d"));
      });

      // adiciona todas as datas programadas na variavel "arrayDateCurrent", mas tendo como referencia o mês do clique
      arrayDateProgrammed.map((e) => {
        const mounthDateProgrammed = dayjs(e).get("M"); // filtra datas por mês
        if (mounthDateProgrammed === clickDate) {
          arrayDateCurrent.push(e);
        }
      });

      // adiciona as datas programadas do mês na variavel "arrayDateCurrentMounth", mas tendo como referencia o clique do mês.
      arrayDateCurrent.map((e) => {
        if (dayjs() > dayjs(e)) {
          arrayDateCurrentMounth.push(dayjs(e).format("DD/MM/YYYY"));
        }
      });

      // compara as datas atrasadas em cada mês
      if (clickDate === dateCurrent) {
        return `${arrayDateCurrentMounth.length} Tryout atrasado no mês`;
      } else if (clickDate > dateCurrent) {
        return `${arrayDateCurrentMounth.length} Tryout atrasado no mês`;
      } else if (clickDate < dateCurrent) {
        return `${arrayDateCurrentMounth.length} Tryout atrasado no mês`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-content {
  padding: var(--negativeSpace);
  width: 100%;
  display: flex;
  flex-direction: column;

  .btn {
    width: 100%;
    border-bottom: 1px solid var(--gray_text);
    padding: 0 0 10px 0;
  }

  .calendar-container {
    widows: 100%;
    display: flex;

    .calendar {
      width: 45%;
      display: flex;
      flex-direction: column;

      .legend {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        margin: 25px 0 25px 0;

        span {
          display: flex;
          align-items: center;

          img {
            margin: 0 5px 0 5px;
          }
        }

        .span-today {
          color: var(--blue);
        }

        .span-late {
          color: var(--red);
        }

        .span-todo {
          color: var(--green);
        }
      }

      .contentCount {
        margin-top: 10px;
        background-color: #fff;
        border: 2px solid var(--gray);
        border-radius: 10px;
        padding: 10px;
        .programmed_retard {
          color: var(--red);
        }
      }
    }

    .list-content {
      width: 65%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;

      header {
        text-align: center;
      }

      .cards {
        height: max(50vh, 60vh);
        overflow-y: auto;
        border-radius: 5px;
        .cardCalendar {
          background-color: var(--gray);
          padding: 10px;
          border-radius: 10px;
        }
      }

      .cards::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      .cards::-webkit-scrollbar-thumb {
        background: var(--gray_text);
        border-radius: 2px;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      display: flex;
      flex-direction: column;

      .calendar {
        width: 100%;
      }
      .list-content {
        width: 100%;
      }
    }
  }
}
</style>

