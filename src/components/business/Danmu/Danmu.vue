<!--
 * @Author: ShawnPhang
 * @Date: 2023-01-01 16:38:11
 * @Description: 弹幕组件 (参考自：https://mrluo.life/article/detail/146/danmaku-implement，作者：Heero.Luo)
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-01-01 22:57:10
-->
<template>
  <div id="danmu-container" class="container"></div>
</template>

<script lang="ts"></script>

<style scoped>
  .container {
    pointer-events: none;
    position: fixed;
    width: 100%;
    height: 36%;
    left: 0;
    top: 0;
    overflow: hidden;
  }
</style>
