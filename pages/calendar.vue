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
            color="teal"
            show-caps
            is-expanded
            title-position="left"
            :attributes="attrs"
          />
        </no-ssr>

        <div class="contentCount">
          <h4>Mês: {{ newDateMonth(date) }}</h4>
          <h5>Atrasados: 03</h5>
          <h5>Programados: 10</h5>
        </div>
      </div>

      <div class="list-content">
        <header>
          <h1>Data: {{ newDate(date) }}</h1>
        </header>

        <div class="cards">
          <div class="cardCalendar">
            <CardModel
              v-for="mold in dataNewMold"
              :key="mold.id"
              :statusOrigin="mold.origin"
              :flag="mold.flag"
              :typeCard="mold.typeCard"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import dayjs from 'dayjs'

export default {

  layout: 'calendar',
  head() {
    return {
      title: 'TryOut - Kanban',
    }
  },
  data() {
    return {
      dataExample: [],
      attrs: [],
      date: dayjs(new Date()).format('MM'),

      dataNewMold: [
        { id: 1, origin: 'Aprovado', flag: '1', typeCard: 'solicitation' },
        { id: 2, origin: 'Reprovado', flag: '3', typeCard: 'solicitation' },
        { id: 3, origin: '', flag: '2', typeCard: 'solicitation' },
        { id: 4, origin: 'Aprovado', flag: '1', typeCard: 'solicitation' },
        { id: 5, origin: 'Reprovado', flag: '3', typeCard: 'solicitation' },
      ],
    }
  },

  created: async function () {},

  methods: {
    newDate(valor) {
      return dayjs(valor).locale('pt-br').format('DD/MM/YYYY')
    },
    newDateMonth(valor) {
      return dayjs(valor).format('MM')
    },

    verifyColorDays(dates) {
      const colorDate2 = dayjs(dates)
      const todayDate = dayjs(new Date())
      const colorDate = todayDate.diff(colorDate2, 'day')
      if (colorDate > 0) {
        return 'red'
      } else if (colorDate == 0) {
        return 'blue'
      } else {
        return 'green'
      }
    },

    verifyLateDays(firstDay, secondDay) {
      const date1 = dayjs(firstDay)
      const date2 = dayjs(secondDay)
      const dayCalculed = date1.diff(date2, 'day')
      if (dayCalculed > 0) {
        return `atraso de: ${dayCalculed}`
      } else if (dayCalculed == 0) {
        return `Programado para hoje`
      } else {
        return `ainda faltam ${dayCalculed * -1} dias`
      }
    },
  },
}
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

