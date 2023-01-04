/*
 * @Author: ShawnPhang
 * @Date: 2022-12-31 15:05:22
 * @Description: 引用加载器
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2022-12-31 15:05:29
 */
export default (type: string, url: string) => {
  return new Promise<void>((resolve) => {
    const link_element = document.createElement(type)
    if (type === 'script') {
      link_element.setAttribute('src', url)
    } else if (type === 'link') {
      link_element.setAttribute('rel', 'stylesheet')
      link_element.setAttribute('href', url)
    }
    document.head.appendChild(link_element)
    link_element.onload = function () {
      resolve()
    }
  })
}