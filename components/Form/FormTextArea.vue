<template>
  <div class="inputTextArea">
    <label> {{ title }} </label>
    <textarea
      cols="30"
      rows="10"
      :value="value"
      v-on="inputListeners"
      :readonly="readonly"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'FormTextArea',
  props: {
    readonly:String,

    value: {
      type: [String, Number],
      default: undefined,
    },
    title: {
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
.inputTextArea {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--radius);
  textarea {
    padding: var(--paddingInput);
    border-radius: var(--radius);
    resize: none;
  }
}
</style>
