import {defineComponent} from './vendor/vue.esm-browser.js';
import {agendaItemDefaultTitles, agendaItemIcons} from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props   : {
    agendaItem: {
      type    : Object,
      required: true,
      validator(value) {
        return Object.keys(agendaItemIcons).includes(value.type)
          && (
            value.title
            || Object.keys(agendaItemDefaultTitles).includes(value.type)
          );
      }
    }
  },
  methods : {
    getTitle(item) {
      return item.title ?? agendaItemDefaultTitles[item.type];
    },
    getIcon(item) {
      return agendaItemIcons[item.type];
    },
  },
  template: `
    <div class="agenda-item">
    <div class="agenda-item__col">
      <img :src="'/assets/icons/icon-'+getIcon(agendaItem)+'.svg'" class="icon" alt="key" />
    </div>
    <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
    <div class="agenda-item__col">
      <h3 class="agenda-item__title">{{ getTitle(agendaItem) }}</h3>
      <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
        <span>{{ agendaItem.speaker }}</span>
        <span class="agenda-item__dot"></span>
        <span class="agenda-item__lang">{{ agendaItem.language ?? 'EN' }}</span>
      </p>
      <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
    </div>
    </div>`,
});
