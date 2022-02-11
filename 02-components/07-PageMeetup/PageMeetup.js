import {defineComponent} from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import {fetchMeetupById} from './meetupService.js';
import MeetupView from './MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  data() {
    return {
      meetup : null,
      loading: false,
      error  : false
    };
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  props: {
    meetupId: {
      type    : Number,
      required: true
    }
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(value, old) {
        window.console.log('watch meetupId', this.meetupId);
        this.meetup = null;
        this.loading = true;
        this.error = false;
        fetchMeetupById(this.meetupId)
          .then((v) => {
            window.console.log(v);
            this.meetup = v;
          })
          .catch((e) => {
            window.console.log(e);
            this.error = e.message;
          })
          .finally(() => {
            this.loading = false;
          });

      }
    }
  },

  template: `
    <div class="page-meetup">
    <meetup-view v-if="meetup" :meetup="meetup" />

    <ui-container v-else-if="loading">
      <ui-alert>Загрузка...</ui-alert>
    </ui-container>

    <ui-container v-else-if="error">
      <ui-alert>{{ error }}</ui-alert>
    </ui-container>
    </div>`,
});
