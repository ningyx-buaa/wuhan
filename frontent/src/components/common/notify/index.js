import Notification from 'components/common/notify/Notification'

const Notify = {
  install: (Vue, initOptions = {}) => {
    Vue.prototype.$notify = {
      show: (props = {
        type: 'primary',
        title: '',
        message: '',
        duration: 4500,
      }) => {
        return new (Vue.extend(Notification))({
          el: document.createElement('div'),
          data: props
        });
      },
      success: (title, message) => {
        Vue.prototype.$notify.show({type: 'success', title: title, message: message})
      },
      info: (title, message) => {
        Vue.prototype.$notify.show({type: 'info', title: title, message: message})
      },
      warn: (title, message) => {
        Vue.prototype.$notify.show({type: 'warning', title: title, message: message})
      },
      error: (title, message) => {
        Vue.prototype.$notify.show({type: 'danger', title: title, message: message})
      },
    };
  }
};

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Notify = Notify;
}

export default Notify;
