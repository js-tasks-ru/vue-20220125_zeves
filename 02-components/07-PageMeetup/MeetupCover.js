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
  methods: {
    getBgStyle(image){
      return image ? `url('${image}')` : null;
    }
  },
  template: `
    <div class="meetup-cover" :style="{'--bg-url': getBgStyle(image)}">
        <h1 class="meetup-cover__title">{{title}}</h1>
    </div>`,
});
