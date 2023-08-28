/*
 * @Author: ShawnPhang
 * @Date: 2022-12-30 23:15:21
 * @Description: 基础状态管理器
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-08-28 11:46:16
 * @site: book.palxp.com
 */
import axios from "axios";
import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", {
  state: () => ({
    scroll: true,
    distanceValue: 0,
    winHeightValue:
      document.documentElement.clientHeight || document.body.clientHeight,
    userData: { view: 0 },
    articleListData: [],
    danmuList: [],
    playBGM: true
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
      this.distanceValue = d;
    },
    setUser(data: any) {
      this.userData = data;
    },
    setArticles(list: any) {
      this.articleListData = list;
    },
    setDanmu(list: any) {
      this.danmuList = list;
    },
    setBGMPlay(s: boolean) {
      this.playBGM = s;
    },
    async pullDiscuss() {
      const res = await axios.get(
        `https://juejin.palxp.com/discuss?id=7184712051171229755`
      );
      // 👇🏻pick自2022年终总结、2022年中总结
      const preset = [
        "加油~ @弹幕员头子",
        "加油，祝好运 @小虎牙007",
        "祝好 同样被裁，加油！ @史远的影子不见了",
        "加油, 祝好 @_音魂不散_",
        "加油 @断桥落雪",
        "你还算年轻了，技术、生活都很积极，前途是有的。@海岛老哥 re: 感谢评论🍺 今年大部分人都一样不太顺利，也只能抱团取暖，相互慰藉了。希望来年都能顺利些 re: 谢谢[握手]",
        "相同的经历，只不过到这个月30号，😅，也属于PHP的重灾区 @九夜",
        "莫名的同感，加油吧 @纵倾童鞋",
        "来过~ @TF男孩 re: [击掌]",
        "优秀的人 @wayne214 re: [比心]",
        "放平心态，我也马上要加入找工作大军了 @德丽莎敲可爱",
        "做就是了，前路也需很漫长，但总会有光明的一天 @Andy_jiahe re: [比心]",
        "唯有风雨兼程，才能练就不坏之身。加油，少年人。 @Asscre re: [比心]",
        "加油！！！工作会找到的 只是时间问题。 @程序视界晓龙 re: [比心]",
        "加油 滑动页面写的真棒 @用户5137758311591 re: [比心]",
        "大佬加油 @梨花苑沉叹 re: [比心]",
        "加油 @小道大成 re: [比心]",
        "祝好 @rexkentzheng re: [比心]",
        "加油💪🏻工作会找到的，不要太焦虑。 @我叫陈龙",
        "大佬真的强 @Ryzen",
        "大佬牛逼啊 @MrYZhou",
        "挺不错的啊，喜欢折腾，才能进步 @BigKongfuPanda",
        "老哥真滴强 @苏卿",
        "有操作的啊，老哥，加油 @any_way",
      ];
      this.danmuList = res.data.result.concat(preset);
    },
  },
});
