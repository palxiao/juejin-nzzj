/*
 * @Author: ShawnPhang
 * @Date: 2023-01-01 16:46:32
 * @Description: 弹幕组件 (参考自：https://mrluo.life/article/detail/146/danmaku-implement，作者：Heero.Luo)
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-01 23:13:31
 */
import Danmaku from './lib/danmaku.js'
import init from './lib/init'

export default () => {
  const container = document.getElementById('danmu-container')
  const danmaku = new Danmaku({
    container,
  })
  init(danmaku, container)

  let hasMsg: boolean = false

  danmaku.start = (newMsg: any) => {
    if (!hasMsg && newMsg) {
      hasMsg = true
      for (let i = 0; i < newMsg.length; i++) {
        danmaku.add({
          msg: newMsg[i],
          fontSize: Math.floor(Math.random() * 10) + 20,
        })
      }
    }
  }

  return danmaku
  // danmaku.resize()
}
