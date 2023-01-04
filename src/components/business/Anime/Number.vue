<!--
 * @Author: ShawnPhang
 * @Date: 2022-12-19 02:01:54
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-12-19 16:16:18
 * @site: book.palxp.com
-->
<template>
  <span ref="numEl" class="number">-</span>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, watch, ref } from "vue";
import anime from "animejs/lib/anime.es.js";

export default defineComponent({
  props: { progress: {}, value: {} },
  setup(props) {
    const numEl: Element | any = ref(null);

    let seekAnim: any = null;

    watch(
      () => props.progress,
      (val: number | any) => {
        seekAnim && seekAnim.seek(seekAnim.duration * val);
      }
    );

    onMounted(async () => {
      await nextTick();

      seekAnim = anime.timeline({
        // targets: ".test",
        easing: "linear",
        autoplay: false,
        // loop: true
      });
      var change = { value: 0 };

      seekAnim.add({
        targets: change,
        round: 1,
        value: props.value,
        // keyframes: [{ value: 200, delay: 1000 }, { value: 655 }],
        // easing: 'easeOutElastic(1, .8)',
        update: function () {
          numEl.value.innerHTML = format(change.value);
        },
      });
    });
    
    function format(num: number | string) {
      return num.toLocaleString();
    }

    return { numEl, format };
  },
});
</script>


<style scoped>
.number {
  color: inherit;
  font-size: inherit;
}
</style>