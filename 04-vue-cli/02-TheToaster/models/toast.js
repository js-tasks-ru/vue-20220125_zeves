class ToastModel {
  constructor(type, msg, icon, timeout) {
    this.type = type;
    this.msg = msg;
    this.icon = icon;
    this.timeout = timeout;
    this.timeoutResource = null;
  }
}

export default ToastModel;
