import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
      validator(value) { return Number.isInteger(value); }
    }
  },
  emits: ['update:count'],
  methods: {
    incr(event) {
      this.$emit('update:count', this.count + 1);
    }
  },
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  // Шаблон потребуется отредактировать
  template: `<button @click="incr" type="button">{{count}}</button>`,
});
