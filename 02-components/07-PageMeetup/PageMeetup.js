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
        window.console.log('watch meetupId', this.$props.meetupId);
        this.$data.meetup = null;
        this.$data.loading = true;
        this.$data.error = false;
        fetchMeetupById(this.$props.meetupId)
          .then((v) => {
            window.console.log(v);
            this.meetup = v;
          })
          .catch((e) => {
            window.console.log(e);
            this.$data.error = true;
          })
          .finally(() => {
            this.$data.loading = false;
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
      <ui-alert>Test Error</ui-alert>
    </ui-container>
    </div>`,
});
