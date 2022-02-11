import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
      required: true,
    },
    image: String,
  },
  computed: {
    bgUrl(){
      return this.image ? `url('${this.image}')` : null;
    }
  },
  template: `
    <div class="meetup-cover" :style="{'--bg-url': bgUrl}">
        <h1 class="meetup-cover__title">{{title}}</h1>
    </div>`,
});
