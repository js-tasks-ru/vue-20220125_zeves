import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

const Operations = {
  sum     : '+',
  subtract: '-',
  multiply: '*',
  divide  : '/'
};

const root = defineComponent({
  data() {
    return {
      a : 0,
      b : 0,
      op: Object.keys(Operations).shift(),
    };
  },

  computed: {
    result: function () {
      // на this.op можно повесить guard или вообще сделать прокси из него с дефолтным поведением либо вообще контролировать его значение через watch
      let f = this.a + Operations[this.op] + this.b;
      window.console.log(f);
      return eval(f);
    }
  },

  methods: {
    bGuard: function(event) {
      let newVal = event.target.value;
      let oldVal = this.b;
      window.console.log('methods::bGuard', event, newVal, oldVal);
      if (newVal == 0 && this.op == Object.keys(Operations).slice(-1).pop()) {
        event.target.value = oldVal; // todo а вот это происходит синхронно или асинхронно - отрисовка текста в бразурее в поле input[@type=text]?
        this.b = oldVal;
      }else{
        this.b = newVal;
      }
    }
  },
  watch: {
    // b(val, old) {
    //   window.console.log('watch::b', val, old);
    //   this.$nextTick(() => {
    //     window.console.log('watch::b::nextTick', val, old);
    //     if (val == 0 && this.op == Object.keys(Operations).slice(-1).pop()) {
    //       this.b = old;
    //     }
    //   });
    // },
    op(val, old) {
      window.console.log('watch::op', val, old);
      this.$nextTick(() => {
        window.console.log('watch::op::nextTick', val, old);
        if (val == Object.keys(Operations).slice(-1).pop() && this.b == 0) {
          this.op = old;
        }
      });
    }
  }
});

const app = createApp(root);

const vm = app.mount('#app'); // инстанс компонента

window.vm = vm; // для консоли в браузере
