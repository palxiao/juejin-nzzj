/*
 * @Author: ShawnPhang
 * @Date: 2023-01-01 05:54:08
 * @Description: music
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-01 15:00:34
 */
import axios from 'axios'

export default async () => {
  // Merry Christmas Mr. Lawrence - FYI
  const { data } = await axios.get(`https://music.palxp.com/song/url?id=1896117715&realIP=116.25.146.177`)
  const cd = data.data[0].url
  const audio = new Audio(cd)
  audio.volume = 0.3
  audio.loop = true
  return audio
}
