<template>
  <div class="input">
    <label> {{ label }} </label>
    <input :type="type" :placeholder="placeholder" :value="value" v-on="inputListeners" :disabled="disabled"
      :readonly="readonly" />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: String,
    type: String,
    placeholder: String,
    value: String,
    disabled: String,
    readonly:String,
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
  gap: 0.3rem;

  label {
    font-size: 0.8rem;
    font-weight: var(--bold);
  }

  input {
    padding: var(--paddingInput);
    border-radius: 0.4rem;
    outline: 0;
    border: none;
    background-color: var(--gray);
    margin-bottom: 1rem;
  }

  input::placeholder {
    color: var(--gray_text);
  }
}
</style>
