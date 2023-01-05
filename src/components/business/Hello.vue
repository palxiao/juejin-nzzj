<!--
 * @Author: ShawnPhang
 * @Date: 2022-12-18 23:35:49
 * @Description:  
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-05 20:50:52
 * @site: book.palxp.com
-->
<template>
  <div class="wrap">
    <div ref="letterEl" class="my_letter">
      <div ref="halfEl" style="transform: rotate(180deg)" class="envelope"></div>
      <div class="envelope"></div>
      <div ref="paperEl" class="paper"><span>2022年度报告</span><span>广告位招租~</span><span>( ͡°ᴥ ͡° ʋ)</span></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, watch, nextTick, ref } from 'vue'
  import anime from 'animejs/lib/anime.es.js'

  export default defineComponent({
    props: { progress: {} },
    setup(props) {
      let seekAnim: any = null
      const letterEl = ref(null)
      const paperEl = ref(null)
      const halfEl = ref(null)
      const wh = document.documentElement.clientHeight || document.body.clientHeight

      watch(
        () => props.progress,
        (val: number | any) => {
          seekAnim && seekAnim.seek(seekAnim.duration * val)
        }
      )

      onMounted(async () => {
        await nextTick()
        seekAnim = anime.timeline({
          targets: letterEl.value,
          easing: 'linear',
          autoplay: false,
        })
        seekAnim
          .add({
            opacity: 0.4,
            translateY: wh / 2,
            duration: 350,
          })
          .add({
            opacity: 0.6,
            translateY: wh / 2,
            rotate: 360,
            scale: 2.5,
            duration: 500,
          })
          .add({
            opacity: 1,
            translateY: wh / 1.5,
            scale: 2.5,
            duration: 200,
          })
          .add({
            translateY: wh / 1.2,
            overflow: 'initial',
            scale: 2.5,
            duration: 200,
          })
          .add({
            targets: halfEl.value,
            opacity: 0,
          })
          .add({
            targets: paperEl.value,
            opacity: 1,
          })
          .add({
            targets: paperEl.value,
            translateY: '-40%',
          })
          .add({
            opacity: 0,
            translateY: wh / 1.5,
          })
      })

      return { letterEl, paperEl, halfEl }
    },
  })
</script>

<style scoped>
  .wrap {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
  }
  .my_letter {
    position: relative;
    display: inline-block;
    /* overflow: hidden; */
    opacity: 0.28;
    width: 30%;
    height: 10vw;
  }
  .envelope {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: url('https://photo.palxp.com/nzzj-2022/xin.png') no-repeat center center;
    background-size: contain;
  }
  .paper {
    color: #666;
    padding-top: 5%;
    /* letter-spacing: 0.1em; */
    position: absolute;
    left: 0;
    display: inline-block;
    background: url('https://photo.palxp.com/nzzj-2022/zhi.png') no-repeat center center;
    background-size: contain;
    opacity: 0;
    width: 100%;
    height: 20vw;
  }
  .paper span {
    display: block;
    font-size: 2vh;
    margin-bottom: 2vh;
  }
</style>
