Object.assign =
  Object.assign ||
  function (target) {
    if (target == null) {
      throw new Error('target cannot be null')
    }

    let i = 0,
      key,
      src
    const len = arguments.length
    while (++i < len) {
      src = arguments[i]
      if (src != null) {
        for (key in src) {
          if (Object.prototype.hasOwnProperty.call(src, key)) {
            target[key] = src[key]
          }
        }
      }
    }

    return target
  }

export default function init(danmaku, container) {
  let width = container.offsetWidth
  let height = container.offsetHeight
  window.addEventListener(
    'resize',
    function () {
      if (container.offsetWidth !== width || container.offsetHeight !== height) {
        danmaku.resize()
        width = container.offsetWidth
        height = container.offsetHeight
      }
    },
    false
  )
}
