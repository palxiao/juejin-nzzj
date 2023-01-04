<!--
 * @Author: ShawnPhang
 * @Date: 2022-12-18 22:40:14
 * @Description: 
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-04 04:13:21
-->

<template>
  <div class="sticky">
    <div ref="el" :style="{ height: wh + 'px', backgroundImage: 'url(' + bg + ')' }" :class="{ 'release-scroll': relative }" class="box">
      <slot :progress="process"></slot>
    </div>
    <div ref="body" :style="'height:' + long + 'px;'"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, onMounted, computed, watch, nextTick } from 'vue'
  // import { useBaseStore } from '@/stores/base'
  import scrollListener from '@/utils/scrollListener'

  export default defineComponent({
    props: {
      long: {},
      bg: {},
      modelValue: {},
    },
    setup(props, context) {
      const state: any = reactive({
        wh: document.documentElement.clientHeight || document.body.clientHeight,
        relative: false,
        startIndex: 0,
        endIndex: 0,
        el: null,
        body: null,
        url: '',
        process: 0,
      })
      // const baseStore = useBaseStore()

      // const scroll = computed(() => {
      //   return baseStore.distance
      // });

      scrollListener((scroll: number) => {
        let process = 0
        if (scroll > state.startIndex && scroll <= state.endIndex) {
          process = (scroll - state.startIndex) / (state.endIndex - state.startIndex)
          // context.emit("update:modelValue", process);
          state.process = process
          state.relative = false
          state.el.style.top = 0
        } else if (scroll > state.endIndex) {
          context.emit('done') // 完成回调函数
          state.process = 1
          state.relative = true
          if (state.el) {
            state.el.style.top = state.body.offsetHeight + 'px'
          }
        }
      })

      // watch(
      //   () => baseStore.distance,
      //   (scroll: number | any) => {
      //     let process = 0
      //     if (scroll > state.startIndex && scroll <= state.endIndex) {
      //       process = (scroll - state.startIndex) / (state.endIndex - state.startIndex)
      //       // context.emit("update:modelValue", process);
      //       state.process = process
      //       state.relative = false
      //       state.el.style.top = 0
      //     } else if (scroll > state.endIndex) {
      //       context.emit('done') // 完成回调函数
      //       state.process = 1
      //       state.relative = true
      //       if (state.el) {
      //         state.el.style.top = state.body.offsetHeight + 'px'
      //       }
      //     }
      //   }
      // )

      onMounted(async () => {
        await nextTick()
        state.startIndex = state.el.offsetTop
        state.endIndex = state.startIndex + parseInt(props.long + '', 10)
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style scoped>
  .box {
    background-repeat: repeat-x;
    width: 100%;
    position: sticky;
    height: 100%;
    overflow: hidden;
  }
  .release-scroll {
    position: relative !important;
  }
</style>
