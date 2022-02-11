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
      return `url('${image}')`;
    }
  },
  template: `
    <div class="meetup-cover" :style="{'--bg-url': image ? getBgStyle(image) : null}">
        <h1 class="meetup-cover__title">{{title}} | {{image}}</h1>
    </div>`,
});
