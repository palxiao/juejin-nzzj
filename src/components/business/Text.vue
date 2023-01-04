<!--
 * @Author: ShawnPhang
 * @Date: 2022-12-19 02:01:54
 * @Description:  
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-01 05:19:55
 * @site: book.palxp.com
-->
<template>
  <div class="flex-layout wrap">
    <h1 ref="wrapEl" class="ml11">
      <span class="text-wrapper">
        <span ref="lineEl" class="line line1"></span>
        <span ref="textEl" class="letters">{{ value }}</span>
      </span>
    </h1>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, nextTick, watch, ref } from 'vue'
  import anime from 'animejs/lib/anime.es.js'

  export default defineComponent({
    props: { progress: {}, value: {}, destroy: {} },
    setup(props) {
      const wrapEl = ref(null)
      const textEl = ref(null)
      const lineEl = ref(null)

      let seekAnim: any = null

      watch(
        () => props.progress,
        (val: number | any) => {
          seekAnim && seekAnim.seek(seekAnim.duration * val)
        }
      )

      onMounted(async () => {
        await nextTick()
        var textWrapper: any = textEl.value
        textWrapper.innerHTML = textWrapper.textContent.replace(/([\s\S]|\w)/g, "<span class='letter'>$&</span>")

        seekAnim = anime.timeline({
          // targets: ".test",
          easing: 'linear',
          autoplay: false,
          // loop: true
        })

        seekAnim
          .add({
            targets: lineEl.value,
            scaleY: [0, 1],
            opacity: [0.5, 1],
            easing: 'easeOutExpo',
            duration: 700,
          })
          .add({
            targets: lineEl.value,
            translateX: [0, textWrapper.getBoundingClientRect().width + 10],
            easing: 'easeOutExpo',
            duration: 700,
            delay: 100,
          })
          .add({
            targets: textWrapper.childNodes,
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 600,
            offset: '-=775',
            delay: (el, i) => 34 * (i + 1),
          })
          .add({
            targets: wrapEl.value,
            opacity: props.destroy ? 0 : 1,
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 1000,
          })
      })
      return {
        wrapEl,
        textEl,
        lineEl,
      }
    },
  })
</script>

<style scoped>
  .wrap {
    height: 100%;
  }
  .ml11 {
    font-weight: 700;
    font-size: 5vw;
    color: #ffffff;
  }

  .ml11 .text-wrapper {
    position: relative;
    display: inline-block;
    padding-top: 0.1em;
    padding-right: 0.05em;
    padding-bottom: 0.15em;
  }

  .ml11 .line {
    opacity: 0;
    position: absolute;
    left: 0;
    height: 100%;
    width: 3px;
    background-color: #fff;
    transform-origin: 0 50%;
    animation: blink-bg 0.95s infinite;
  }

  .ml11 .line1 {
    top: 0;
    left: 0;
  }

  .ml11 .letter {
    display: inline-block;
    line-height: 1em;
  }
</style>
