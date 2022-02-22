<template>
  <div class="toast" :class="toastClass">
    <ui-icon class="toast__icon" :icon="toast.icon" />
    <span>{{ toast.msg }}</span>
    <slot name="close"></slot>
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import ToastModel from '../models/toast';
import icons from '../collections/icons';

export default {
  name: 'TheToasterItem',

  props: {
    toast: {
      type     : ToastModel,
      required : true,
      validator: (toast) => Object.keys(icons).includes(toast['icon']),
    }
  },

  computed: {
    toastClass() {
      return `toast_${this.toast.type}`;
    }
  },

  components: {UiIcon}
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
