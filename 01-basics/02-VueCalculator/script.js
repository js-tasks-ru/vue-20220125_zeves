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
      op: Object.keys(Operations).slice(-1).pop(),
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

  watch: {
    b(val, old) {
      window.console.log('watch::b',val,old,Object.keys(Operations).slice(-1).pop())
      if (val == 0 && this.op == Object.keys(Operations).slice(-1).pop()) {
        this.b = old;
      }
    },
    op(val, old) {
      window.console.log('watch::op',val,old,Object.keys(Operations).slice(-1).pop())
      if (val == Object.keys(Operations).slice(-1).pop() && this.b == 0) {
        this.op = old;
      }
    }
  }
});

const app = createApp(root);

app.mount('#app');
