<template>
  <div class="input">
    <label> {{ label }} </label>

    <div id="alvo">
      <select
        name="opcoes"
        id="select"
        v-on="inputListeners"
        v-model="selected"
      >
        <option
          v-for="machine in options"
          :value="machine.VisResCode"
          :key="machine"
        >
          {{ machine.VisResCode }}
        </option>
      </select>
      <input type="hidden" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInputSelect",
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
      default: "text",
    },
    options: {
      type: [Array, Object],
      default: undefined,
    },
  },

  data() {
    return {
      localValue: this.value,
      selected: "",
    };
  },

  watch: {
    value(value) {
      this.localValue = value;
    },
  },

  computed: {
    inputListeners() {
      const vm = this;
      return {
        ...this.$listeners,
        input(event) {
          vm.$emit("input", event.target.value);
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.8rem;
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
