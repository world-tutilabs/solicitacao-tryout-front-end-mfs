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
          <h5>Atrasados: 7</h5>
          <h5>Programados: 3</h5>
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
    newDateProgammed(valor) {
      let date2;
      let date1;

      for (const date of valor) {
        date1 = dayjs(new Date());
        date2 = dayjs(date.programmed_date).add(1, "day");
        const color_date = date2.diff(date1, "day");
        console.log(color_date);
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
    newDateCard(valor) {
      return dayjs(valor).add(1, "day").format("DD/MM/YYYY");
    },
    newDate(valor) {
      const data = dayjs(valor).format("DD/MM/YYYY");
      return data;
    },
    newDateMonth(valor) {
      return dayjs(new Date()).format("MM");
    },

    verifyColorDays(dates) {
      const Date2 = dayjs(new Date());
      const DataCLick = dayjs(dates);
      const colorDate = DataCLick.diff(Date2, "day", false);
      if (colorDate < 0) {
        return "red";
      } else if (colorDate == 0) {
        return "blue";
      } else {
        return "green";
      }
    },

    verifyLateDays(firstDay, secondDay) {
      const date1 = dayjs(firstDay);
      const date2 = dayjs(secondDay).add(1, "day");

      const dayCalculed = date1.diff(date2, "day");
      if (dayCalculed > 0) {
        return `${dayCalculed + 1}`;
      } else if (dayCalculed == 0) {
        return `Programado para hoje`;
      } else {
        return `ainda faltam ${dayCalculed * -1} dias`;
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

