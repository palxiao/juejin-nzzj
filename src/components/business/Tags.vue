<!--
 * @Author: ShawnPhang
 * @Date: 2022-12-19 02:01:54
 * @Description: 标签动感显示
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-08-28 14:20:14
 * @site: book.palxp.com
-->
<template>
  <div class="wrap">
    <div class="flex-layout" style="height: 40vh; text-align: center">
      <Text class="ZK" :progress="progress * 2" value="这些都是你擅长的创作领域" />
    </div>
    <div class="group">
      <span v-for="t in tags" :key="t" class="letters">{{ t }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, nextTick, watch, ref } from 'vue'
  import anime from 'animejs/lib/anime.es.js'
  import Text from './Anime/Text.vue'

  export default defineComponent({
    components: { Text },
    props: { progress: {}, tags: {}, destroy: {} },
    setup(props) {
      let seekAnim: any = null

      watch(
        () => props.progress,
        (val: number | any) => {
          seekAnim && seekAnim.seek(seekAnim.duration * val)
        }
      )

      onMounted(async () => {
        await nextTick()

        seekAnim = anime.timeline({
          easing: 'linear',
          autoplay: false,
          targets: '.wrap .letters',
        })

        const wW = document.documentElement.clientWidth || document.body.clientWidth
        const wH = document.documentElement.clientHeight || document.body.clientHeight

        seekAnim
          .add({
            targets: '.wrap .letters',
            translateX: function (el: any, i: number) {
              return anime.random(-wW, wW)
            },
            translateY: function (el: any, i: number) {
              return wH / 3 + -(wH / 3) * i
            },
            scale: function (el: any, i: number, l: number) {
              return l - i + 0.05
            },
            rotate: function () {
              return anime.random(-360, 360)
            },
            duration: function () {
              return anime.random(1200, 1800)
            },
            delay: function () {
              return anime.random(0, 400)
            },
            direction: 'alternate',
          })
          .add({
            targets: '.wrap .letters',
            translateX: function (el: any, i: number) {
              return 0
            },
            translateY: function (el: any, i: number) {
              return 0
            },
            scale: function (el: any, i: number, l: number) {
              return 1
            },
            rotate: function () {
              return 0
            },
            opacity: 1,
            duration: function () {
              return anime.random(1200, 1800)
            },
            delay: function () {
              return anime.random(0, 400)
            },
            direction: 'alternate',
          })
          .add({
            duration: 1500,
            delay: 1500,
          })
      })
      return {}
    },
  })
</script>

<style scoped>
  .group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .letters {
    opacity: 0;
    color: #fff;
    display: inline-block;
    font-size: 7vh;
    letter-spacing: 0.04em;
    margin-bottom: 0.4vh;
  }
</style>
