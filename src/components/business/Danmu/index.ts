/*
 * @Author: ShawnPhang
 * @Date: 2023-01-01 16:46:32
 * @Description: 弹幕组件 (参考自：https://mrluo.life/article/detail/146/danmaku-implement，作者：Heero.Luo)
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-05 21:18:12
 */
import Danmaku from './lib/danmaku.js'
import init from './lib/init'

export default () => {
  const container = document.getElementById('danmu-container')
  const danmaku = new Danmaku({
    container,
  })
  init(danmaku, container)

  let currentMsg: any[] = []

  danmaku.start = (newMsg: any) => {
    if (newMsg) {
      const diff = newMsg.concat(currentMsg).filter((v: any) => !newMsg.includes(v) || !currentMsg.includes(v))
      currentMsg = [...newMsg, ...currentMsg]
      for (let i = 0; i < diff.length; i++) {
        danmaku.add({
          msg: diff[i],
          fontSize: Math.floor(Math.random() * 10) + 20,
        })
      }
    }
  }

  return danmaku
  // danmaku.resize()
}
