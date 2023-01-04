/*
 * @Author: ShawnPhang
 * @Date: 2022-12-30 23:15:21
 * @Description: 基础状态管理器
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-01 21:01:19
 * @site: book.palxp.com
 */
import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', {
  state: () => ({
    scroll: true,
    distanceValue: 0,
    winHeightValue: document.documentElement.clientHeight || document.body.clientHeight,
    userData: { view: 0 },
    articleListData: [],
    danmuList: [],
  }),
  getters: {
    distance: (state) => state.distanceValue,
    winHeight: (state) => state.winHeightValue,
    articles: (state) => state.articleListData,
    user: (state) => state.userData,
    danmu: (state) => state.danmuList,
  },
  actions: {
    changeScroll(d: number) {
      this.distanceValue = d
    },
    setUser(data: any) {
      this.userData = data
    },
    setArticles(list: any) {
      this.articleListData = list
    },
    setDanmu(list: any) {
      this.danmuList = list
    },
  },
})
