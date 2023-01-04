<!--
 * @Author: ShawnPhang
 * @Date: 2022-12-19 03:39:29
 * @Description: GIF解析器
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2022-12-31 15:18:30
 * @site: book.palxp.com
-->
<template>
  <div class="window">
    <div class="bg" src=""><span class="url">https://juejin.cn</span></div>
    <img
      id="example1"
      src="https://fastly.jsdelivr.net/gh/filess/img19@main/2022/12/19/1671451556117-a5962352-abc5-4087-b8ad-9cfc90a501f1.gif"
      rel:animated_src="https://fastly.jsdelivr.net/gh/filess/img19@main/2022/12/19/1671451556117-a5962352-abc5-4087-b8ad-9cfc90a501f1.gif"
      rel:auto_play="0"
      style="opacity: 0"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import loader from "@/utils/deferLoader";

export default defineComponent({
  props: { progress: {} },
  setup(props) {
    // const src: any = ref(null);
    // src.value = await import("@/assets/images/99+.gif");
    // return { src };
    let length = 0;
    let sup: any = null;
    let step = 1;

    watch(
      () => props.progress,
      (val: number | any) => {
        if (length) {
          if (Math.ceil(length * val) > step) {
            sup.move_relative(1);
            step = Math.ceil(length * val);
          } else if (Math.ceil(length * val) < step) {
            sup.move_relative(-1);
            step = Math.ceil(length * val);
          }
        }
      }
    );

    onMounted(async () => {
      await load();
      sup = new (window as any).SuperGif({
        gif: document.getElementById("example1"),
        loop_mode: false,
      });
      sup.load(() => {
        length = sup.get_length();
      });
    });

    async function load() {
      await loader(
        "script",
        "https://cdn.jsdelivr.net/npm/jsgif@1.0.2/libgif.js"
      );
    }
  },
});
</script>

<style>
#example1 {
  position: absolute;
  left: 9999px;
}
canvas {
  width: 100%;
}
.window {
  text-align: center;
  position: relative;
  height: 100%;
}
.window > .jsgif {
  width: 90%;
  display: inline-block;
  position: absolute;
  left: 4%;
  top: 52%;
  transform: translateY(-50%);
}
.window > .bg {
  position: absolute;
  z-index: -1;
  width: 94%;
  height: 25vw;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
  background: url(https://fastly.jsdelivr.net/gh/filess/img19@main/2022/12/19/1671424377266-3012cf8e-812f-457f-81bf-7bc1b85f2dd7.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.bg > .url {
  position: absolute;
  left: 1vw;
  color: rgba(255, 255, 255, 0.8);
  top: 0.5vw;
  font-size: 1vw;
  letter-spacing: 0.1rem;
}
canvas:hover {
  cursor: none;
}
</style>