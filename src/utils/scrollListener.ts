/*
 * @Author: ShawnPhang
 * @Date: 2022-12-30 22:31:59
 * @Description: 滚动页面监听
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-03 11:57:05
 * @site: book.palxp.com
 */
// import { useBaseStore } from '@/stores/base'
export default (cb: any = null) => {
  const handleScroll = () => {
    // const baseStore = useBaseStore()
    const currentIndex = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    // store.commit("changeScroll", currentIndex);
    // baseStore.changeScroll(currentIndex)
    cb && cb(currentIndex)
  }
  window.addEventListener('scroll', handleScroll)
}
