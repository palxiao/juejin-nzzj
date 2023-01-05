/*
 * @Author: ShawnPhang
 * @Date: 2022-12-31 14:18:07
 * @Description: 自动滚动方法
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-05 21:55:36
 */
export default (back = false) => {
  const maxScroll = Number.MAX_SAFE_INTEGER
  let lastScroll = 0
  const wh = document.documentElement.clientHeight || document.body.clientHeight
  const step = wh / 140

  // const interval = setInterval(() => {
  const interval: any = () => {
    window.scrollBy(0, back ? -(10 * step) : step)
    const scrollTop = document.documentElement.scrollTop || window.scrollY
    if (scrollTop === maxScroll || scrollTop === lastScroll) {
      !back && clearInterval(interval)
      console.log('滑动到达底部')
      back && scrollTop === 0 && clearInterval(interval)
    } else {
      lastScroll = scrollTop
      requestAnimationFrame(interval)
    }
  }
  // }, 16)

  requestAnimationFrame(interval)
}
