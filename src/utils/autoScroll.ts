/*
 * @Author: ShawnPhang
 * @Date: 2022-12-31 14:18:07
 * @Description: 自动滚动方法
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-01 23:03:11
 */
export default (back = false) => {
  const maxScroll = Number.MAX_SAFE_INTEGER
  let lastScroll = 0
  const wh = document.documentElement.clientHeight || document.body.clientHeight
  const step = wh / 140

  const interval = setInterval(() => {
    window.scrollBy(0, back ? -(10 * step) : step)
    const scrollTop = document.documentElement.scrollTop || window.scrollY
    if (scrollTop === maxScroll || scrollTop === lastScroll) {
      !back && clearInterval(interval)
      console.log('滑动到达底部')
      back && scrollTop === 0 && clearInterval(interval)
    } else {
      lastScroll = scrollTop
    }
  }, 16)
}
