<script setup lang="ts">
  import { ref, onMounted, computed, nextTick } from 'vue'
  // import scrollListener from '@/utils/scrollListener'
  import autoScroll from '@/utils/autoScroll'
  // import ScrollWrap from '@palxp/scroll-wrap-vue3'
  import ScrollWrap from '@/components/common/ScrollWrap'
  import Hello from '@/components/business/Hello.vue'
  import Text from '@/components/business/Text.vue'
  import Write from '@/components/business/Anime/Text.vue'
  import Tags from '@/components/business/Tags.vue'
  import Login from '@/components/business/Login'
  // import WebPage from "@/components/business/WebPage.vue";
  import Data from '@/components/business/MyData.vue'
  import { useBaseStore } from '@/stores/base'
  import musicPlayer from './utils/musicPlayer'
  import DanmuUI from './components/business/Danmu/Danmu.vue'
  import danmu from './components/business/Danmu'
  import JSConfetti from 'js-confetti'

  let music: any = {}
  let myDanmu: any = {}
  let jsConfetti: any = {}
  let timer: any = null
  const loginRef: any = ref(null)

  const prefix = process.env
  const isDev = prefix.NODE_ENV === 'development'
  onMounted(async () => {
    // scrollListener()
    myDanmu = danmu()
    !isDev && (music = await musicPlayer())
    jsConfetti = new JSConfetti()
  })
  // 🎉祝贺
  const congratulate = () => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      jsConfetti.addConfetti()
      timer = null
    }, 800)
  }
  const baseStore = useBaseStore()
  // 用户信息
  const user: any = computed(() => baseStore.user)
  // 热门文章 Top3
  const firstBook: any = computed(() => baseStore.articles[0])
  const secondBook: any = computed(() => baseStore.articles[1])
  const lastBook: any = computed(() => baseStore.articles[2])
  // 创作领域
  const tags: any = computed(() => {
    const allTag: any = {}
    baseStore.articles.forEach((item: any) => {
      item.tags.forEach((tag: string) => {
        allTag[tag] ? (allTag[tag] = allTag[tag] + 1) : (allTag[tag] = 1)
      })
    })
    // 翻转标签数组，不考虑顺序合并
    const sortTags: any = []
    for (const key in allTag) {
      allTag[allTag[key]] = key
      delete allTag[key]
    }
    // 通过枚举键名进行排序，取出前6个标签合集
    Object.keys(allTag)
      .sort((a: any, b: any) => Number(b) - Number(a))
      .map((k, i) => {
        i < 6 && sortTags.push(allTag[k])
      })
    return sortTags
  })

  let show = ref(false)
  const autoPlay = () => {
    autoScroll()
  }

  const replay = () => {
    setTimeout(() => {
      loadDone()
    }, 350)
  }

  const loadDone = () => {
    music.play ? music.play() : replay()
    show.value = true
  }
  const toTop = () => {
    autoScroll(true)
    // show.value = false
    // window.scrollTo(0, 0)
    // show.value = true
  }
  const isAllDone = () => {
    // myDanmu.clearScreen()
    myDanmu.start(baseStore.danmu)
  }
  let wh = document.documentElement.clientHeight || document.body.clientHeight

  const specialChange = (p: any) => {
    parseInt(p) > 50 && parseInt(p) < 55 && congratulate()
  }

  const replayDanmu = async () => {
    await baseStore.pullDiscuss()
    myDanmu.start(baseStore.danmu)
    // myDanmu.resize()
  }
</script>

<template>
  <div class="home">
    <Login ref="loginRef" @done="loadDone" />
    <DanmuUI />
    <div style="padding: 1rem">
      <button style="color: #333" @click="autoPlay">自动播放</button> <span class="bgm">BGM: 《Merry Christmas Mr. Lawrence - FY》 作者@<a href="https://juejin.cn/user/2682464103060541/posts">茶无味的一天</a></span>
    </div>
    <div @click="autoPlay" class="title">点击 / 滚动开始</div>

    <template v-if="show">
      <ScrollWrap v-slot="props" :long="wh">
        <Text :progress="props.progress" :value="'你好，' + user.name" />
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="1.2 * wh">
        <Text value="时光飞逝，一弹指顷" :destroy="true" :progress="props.progress" />
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="wh * 2">
        <Text value="请查收你的专属回忆🌹" :destroy="true" :progress="props.progress" />
        <Hello :progress="props.progress" />
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="wh * 4">
        <Data :progress="props.progress" />
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="wh * 2">
        <Tags :progress="props.progress" :tags="tags"></Tags>
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="wh * 4" style="padding: 0.5rem 1.8rem">
        <Write :size="'7vh'" :value="'这是你这年最受欢迎的文章：'" :noLine="true" :progress="props.progress" />
        <Write :size="'7.5vh'" @change="specialChange" :value="`《${firstBook.title}》`" :delay="1000" style="text-align: center; padding: 1vh 0" :noLine="true" :progress="props.progress" />
        <Write :size="'5vh'" :value="`文章被阅读了${firstBook.view_count}次，获得${firstBook.digg_count}个点赞(๑˃̵ᴗ˂̵)👍`" :delay="3700" style="text-align: center" :noLine="true" :progress="props.progress" />
        <Write :size="'5vh'" :value="`共有${firstBook.collect_count}人收藏，${firstBook.comment_count}条评论，热度高达${firstBook.hot_index}(✧∇✧)🔥`" :delay="5000" style="text-align: center" :noLine="true" :progress="props.progress" />
        <Write :size="'6vh'" :value="'是金子总会发光的！'" :delay="6500" style="text-align: center" :progress="props.progress" />
        <!-- <WebPage :progress="props.progress" /> -->
      </ScrollWrap>

      <ScrollWrap v-if="secondBook" v-slot="props" :long="wh * 4" style="padding: 0.5rem 1.8rem">
        <Write :size="'7vh'" :value="'你的这篇文章也写得很不错：'" :noLine="true" :progress="props.progress" />
        <Write :size="'7.5vh'" @change="specialChange" :value="`《${secondBook.title}》`" :delay="1000" style="text-align: center; padding: 1vh 0" :noLine="true" :progress="props.progress" />
        <Write :size="'5vh'" :value="`文章被阅读了${secondBook.view_count}次，获得${secondBook.digg_count}个点赞(๑˃̵ᴗ˂̵)👍`" :delay="3700" style="text-align: center" :noLine="true" :progress="props.progress" />
        <Write :size="'5vh'" :value="`共有${secondBook.collect_count}人收藏，${secondBook.comment_count}条评论，很棒呢✧｡٩(ˊᗜˋ*)و✧`" :delay="5000" style="text-align: center" :noLine="true" :progress="props.progress" />
        <Write :size="'6vh'" :value="'分享技术，传播价值！'" :delay="6500" style="text-align: center" :progress="props.progress" />
      </ScrollWrap>

      <ScrollWrap v-if="lastBook" v-slot="props" :long="wh * 4" style="padding: 0.5rem 1.8rem">
        <Write :size="'7vh'" :value="'这年你太高产了，我还找到了这篇：'" :noLine="true" :progress="props.progress" />
        <Write :size="'7.5vh'" @change="specialChange" :value="`《${lastBook.title}》`" :delay="1000" style="text-align: center; padding: 1vh 0" :noLine="true" :progress="props.progress" />
        <Write :size="'5vh'" :value="`文章被阅读了${lastBook.view_count}次，获得${lastBook.digg_count}个点赞(๑˃̵ᴗ˂̵)👍`" :delay="3700" style="text-align: center" :noLine="true" :progress="props.progress" />
        <Write :size="'5vh'" :value="`共有${lastBook.collect_count}人收藏，${lastBook.comment_count}条评论，厉害哦(ﾟ▽ﾟ)`" :delay="5000" style="text-align: center" :noLine="true" :progress="props.progress" />
        <Write :size="'6vh'" :value="'持续创作，方能历久弥新！'" :delay="6500" style="text-align: center" :progress="props.progress" />
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="1.4 * wh">
        <Text :value="`( ⸍ꔷᗄꔷ⸌)o 送走2022，新的一年来了`" :destroy="true" :progress="props.progress" />
      </ScrollWrap>

      <ScrollWrap v-slot="props" :long="1.5 * wh" @done="isAllDone">
        <Text @change="specialChange" :value="`愿你心有丘壑，一往无前 |•'-'•)و✧`" :progress="props.progress" />
      </ScrollWrap>

      <div @click="toTop" class="title">返回顶部</div>
      <div><button style="color: #333; float: right" @click="replayDanmu">更新弹幕</button></div>
    </template>
  </div>
</template>

<style scoped>
  .home {
    background: #98bec8;
  }
  .title {
    cursor: pointer;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 6vh;
    letter-spacing: 0.2rem;
    animation: blink 3s infinite;
  }
  .bgm {
    color: #333333;
    float: right;
    padding: 0 1rem;
  }
</style>
