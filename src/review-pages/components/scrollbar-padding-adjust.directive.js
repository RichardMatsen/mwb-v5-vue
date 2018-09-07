
export default {
  componentUpdated: function (el) {
    const list = el.querySelector('ul');
    const scrollIsVisible = list.clientHeight < list.scrollHeight;
    el.style.paddingRight = scrollIsVisible ? '0.2em' : '1em';
  }
}
