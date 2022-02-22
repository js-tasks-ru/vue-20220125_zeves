<template>
  <div class="toasts">
    <the-toaster-item v-for="toast in toasts" :toast="toast">
      <template v-slot:close>
        <div class="close" @click="clearToast(toast)">закрыть</div>
      </template>
    </the-toaster-item>
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import TheToasterItem from './TheToasterItem';
import ToastModel from '../models/toast';

export default {
  name: 'TheToaster',

  data(){
    return {
      toasts: []
    }
  },

  expose: ['success', 'error'],

  methods: {
    success(msg, timeout) {
      this.addToast('success',msg, 'check-circle', timeout);
    },

    error(msg, timeout) {
      this.addToast('error',msg, 'alert-circle', timeout);
    },

    addToast(type, msg, icon = 'check-circle', timeout = 5000) {
      let model = new ToastModel(type, msg, icon, timeout);
      let idx = this.toasts.push(model);
      let modelProxy = this.toasts[idx - 1];

      if(timeout) {
        modelProxy.timeoutResource = setTimeout(() => {
          this.clearToast(modelProxy);
        }, timeout);
      }
    },

    clearToast(modelProxy) {
      for(let toastIdx in this.toasts){
        if(this.toasts[toastIdx] === modelProxy){
          clearTimeout(modelProxy.timeoutResource);
          this.toasts.splice(toastIdx, 1);
        }
      }
    }
  },

  components: { UiIcon, TheToasterItem }
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

.close {
  color: black;
  display: block;
  margin: 20px;
}
</style>
