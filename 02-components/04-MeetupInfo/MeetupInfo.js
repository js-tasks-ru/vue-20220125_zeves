import {defineComponent} from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props   : {
    organizer: String,
    place    : String,
    date     : {
      type    : Number,
      required: true,
      validator(value) {
        return Number.isInteger(value);
      }
    }
  },
  computed: {
    localizedDate() {
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(this.$props.date).toLocaleDateString(navigator.language, options);
    },
    formatedDate() {
      return new Date(this.$props.date).toISOString().substr(0, 10);
    }
  },
  template: `
    <ul class="meetup-info">
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
      {{ organizer }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
      {{ place }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
      <time :datetime="formatedDate">{{ localizedDate }}</time>
    </li>
    </ul>`,
});
