import {createApp, defineComponent} from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const root = defineComponent({
    'name': 'Meteup root component',

    data() {
      return {
        meetupId: 1,
      };
    },

  // таким образом я хоче добавить реактивное свойство но не выходит...
  // приходиться удалить computed и добавить в data() =(
  // но если я захочу далее фильтовать именно это свойство - придется создавать новое.
  // а хотелось бы остаться с одним без техничеких свойств.
  // todo: возможно ли как-то получать вычисляемое свойство из промисов?
    computed: {
      meetup: {
        get: function() {
          window.console.log('computed::meetup::get', this.meetup);
          return this.meetup;
        },
        set: function(val){
          window.console.log('computed::meetup::set', val);
          return val;
        }

      }
    },

    watch: {
      meetupId: {
        immediate: true,
        handler(val, oldVal) {
          window.console.log('watch::meetupId', val);
          fetchMeetupById(val).then((val) => {
            window.console.log('watch::meetupId::resolved', val);
            this.meetup = val;
          });
        }
      }
    }
  })
;

createApp(root).mount('#app');
