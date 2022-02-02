import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// defineComponent - Инструментальная задача:  например IDE понимает что app это компонент а не просто Object
// todo Зачем используется передача callable в defineComponent?
const root = defineComponent({
  name: 'Root',

  data() {
    // в виде function чтобы возвращать новый объект
    // не обращать внимания на то что смешаны типы - int и string - просто чтобы поиграться так сделал.
    return {
      testmsg: 'just scope-testing message',
      clicks: 0,
      secondaryCounter: null,
    };
  },

  computed: {
    noop: function(){
      window.console.log('noop');
      return 1;
    },
    counter: {
      get: function () {
        window.console.log('counter::get');
        return this.clicks + ' (counter)';
        // return this.clicks + ' (counter)' + this.secondaryCounter; // бесконечный цикл - автоастановка
      },
      set: function (newVal) {
        window.console.log('counter::set');
        // this.secondaryCounter = newVal; // нарушается SOLID для secondaryCounter (не стоит так делать =)
        // this.counter = newVal; // бесконечный цикл - автоастановка
      },
    },
  },

  watch: {
    // todo: не понял как происходит вызов шаблонной строки тут и превращение в свойство объекта.. (scope: основы ES)
    // 'counter'(val, old) {
    //     window.console.log('watcher::counter::secondaryCounter');
    //     this.secondaryCounter = val + ' #secondary | old value =' + old;
    //     },

    counter: {
      immediate: true,
      handler(val, old) {
        window.console.log('watcher::counter::secondaryCounter');
        this.secondaryCounter = val + ' #secondary | old value =' + old;
      },
    }
  },

  methods: {
    incr(event) {
      window.console.log('incr', event);
      this.clicks++;
    },
  },
});

const app = createApp(root);

const vm = app.mount('#app'); // инстанс компонента

window.vm = vm; // для консоли в браузере
