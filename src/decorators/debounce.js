export default function debounce(time = 50) {
  return function (target, key, desc) {
    const fn = desc.value;
    let lastStart = 0;
    desc.value = function () {
      var now = Date.now();
      if (now - lastStart >= time) {
        lastStart = now;
        return fn.apply(this, arguments);
      }
    };
  };
}