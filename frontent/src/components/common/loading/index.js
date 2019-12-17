// import LetterCube from 'components/common/loading/LetterCube'
import Circle8 from 'components/common/loading/Circle8'

const Loading = {
  install: (Vue, initOptions = {}) => {
    Vue.directive('loading', {
      bind (el, binding, vnode) {
        let position = window.getComputedStyle(el).position;
        if (position === 'static' || position === '') {
          el.style.position = 'relative';
        }
        let loading = new (Vue.extend(Circle8))().$mount();
        loading.$el.style.cssText = 'position: absolute; left: 0; right: 0; top: 0; bottom: 0;';
        if (binding.value) {
          el.appendChild(loading.$el);
        }
        binding.def.loadingBox = loading;
      },
      componentUpdated (el, binding, vnode) {
        if (binding.oldValue !== binding.value) {
          if (binding.value) {
            el.appendChild(binding.def.loadingBox.$el);
          } else {
            el.removeChild(binding.def.loadingBox.$el)
          }
        }
      },
    });
  },
};

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Loading = Loading;
}

export default Loading;
