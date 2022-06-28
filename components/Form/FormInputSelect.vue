<template>
  <div class="input">
    <label> {{ label }} </label>

    <div id="alvo">
      <select name="opcoes" id="select">
        <option value=""></option>
        <option value="1">{{ option }}</option>
        <option value="2">{{ option1 }}</option>
        <option value="3">{{ option2 }}</option>
        <option value="3">{{ option3 }}</option>
        <option value="3">{{ option4 }}</option>
        <option value="3">{{ option5 }}</option>
      </select>
      <input type="hidden" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormInputSelect',
  props: {
    label: {
      type: String,
      default: undefined,
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    option: {
      type: String,
      default: undefined,
    },
    option1: {
      type: String,
      default: undefined,
    },
    option2: {
      type: String,
      default: undefined,
    },
    option3: {
      type: String,
      default: undefined,
    },
    option4: {
      type: String,
      default: undefined,
    },
    option5: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      localValue: this.value,
    }
  },

  watch: {
    value(value) {
      this.localValue = value
    },
  },

  computed: {
    inputListeners() {
      const vm = this
      return {
        ...this.$listeners,
        input(event) {
          vm.$emit('input', event.target.value)
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: var(--bold);
  }

  select {
    padding: var(--paddingInput);
    width: 100%;
    border-radius: 0.4rem;
    outline: 0;
    border: none;
    background-color: var(--gray);
  }
  select::placeholder {
    color: var(--gray_text);
  }
}
</style>
