<template>
  <div class="flex-layout wrap">
    <div ref="textEl" class="info">
      <span
        ><small>这一年你更新了</small> <b>{{ growth.num }}</b> <small>篇文章</small></span
      >
      <span
        ><small>共收获了</small> <b>{{ growth.diggCount }}</b> <small>个点赞</small></span
      >
      <span
        ><small>文章被阅读了</small> <b>{{ growth.viewCount }}</b> <small>次</small></span
      >
      <span
        ><small>有</small> <b>{{ growth.collectCount }}</b> <small>人收藏了你的佳作</small></span
      >
    </div>

    <div ref="wrapEl" class="sticky-wrap sticky">
      <div class="stat-block block shadow">
        <div class="block-title">{{ user.name || '个人成就' }}</div>
        <div class="block-body">
          <!---->
          <div v-show="progress > 0.3 && user.favor" class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25" class="icon stat-author-icon">
              <defs>
                <circle id="a" cx="12.5" cy="12.5" r="12.5"></circle>
              </defs>
              <g fill="none" fill-rule="evenodd">
                <mask id="b" fill="#fff">
                  <use xlink:href="#a"></use>
                </mask>
                <use fill="#E1EFFF" xlink:href="#a"></use>
                <g mask="url(#b)">
                  <g fill="#7BB9FF" fill-rule="nonzero">
                    <path d="M10.273 20.16l-.978-2.297-2.477.302 2.51-4.325 1.164 1.9 2.29.095z"></path>
                    <path d="M14.827 20.16l.978-2.297 2.477.302-2.51-4.325-1.164 1.9-2.29.095z"></path>
                  </g>
                  <path fill-rule="nonzero" stroke="#E1EFFF" stroke-width="1.5" d="M7 10.5a5.5 5.5 0 1 0 11 0 5.5 5.5 0 0 0-11 0z"></path>
                  <path fill="#7BB9FF" fill-rule="nonzero" d="M7.002 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0zm5.769-2.422a.3.3 0 0 0-.543 0l-.655 1.398-1.496.228a.3.3 0 0 0-.17.506L11 11.33l-.255 1.56a.3.3 0 0 0 .442.311l1.312-.725 1.315.726a.3.3 0 0 0 .44-.311L14 11.329l1.092-1.119a.3.3 0 0 0-.169-.506l-1.496-.228-.656-1.398z"></path>
                </g>
              </g>
            </svg>
            <span class="content">优秀创作者</span>
          </div>
          <!---->
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" class="zan">
              <g fill="none" fill-rule="evenodd" transform="translate(0 .57)">
                <ellipse cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"></ellipse>
                <path fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path>
              </g>
            </svg>
            <span class="content">
              文章被点赞
              <span class="count"><Number :value="user.digg" :progress="progress" /></span
            ></span>
          </div>
          <div class="stat-item">
            <svg width="25" height="25" viewBox="0 0 25 25" class="icon stat-view-icon">
              <g fill="none" fill-rule="evenodd">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle>
                <path fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path>
              </g>
            </svg>
            <span class="content">
              文章被阅读
              <span class="count"><Number :value="user.view" :progress="progress" /></span
            ></span>
          </div>
          <div class="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" class="icon stat-jp-icon">
              <g fill="none" fill-rule="evenodd">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle>
                <path fill="#7BB9FF" d="M16.694 13.516l-3.719 3.055a1.1 1.1 0 0 1-1.412-.013l-2.77-2.362-3.597 2.437a.693.693 0 0 1-.895-.101.649.649 0 0 1-.008-.876l3.68-4.096a1.1 1.1 0 0 1 1.507-.122l2.653 2.135 2.248-2.4-1.34-1.358a.5.5 0 0 1 .327-.85l5.438-.313a.5.5 0 0 1 .528.533l-.368 5.449a.5.5 0 0 1-.855.317l-1.417-1.435z"></path>
              </g>
            </svg>
            <span class="content">
              掘力值
              <span class="count"><Number :value="user.power" :progress="progress" /></span
            ></span>
          </div>
          <!---->
        </div>
      </div>
      <!---->
      <div class="follow-block block shadow">
        <div class="follow-item">
          <div class="item-title">关注了</div>
          <div class="item-count">{{ user.follow }}</div>
        </div>
        <div class="follow-item">
          <div class="item-title">关注者</div>
          <div class="item-count">
            <Number :value="user.fans" :progress="progress" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, onMounted, nextTick, computed } from 'vue'
  import Number from '@/components/business/Anime/Number.vue'
  import anime from 'animejs/lib/anime.es.js'
  import { useBaseStore } from '@/stores/base'

  export default defineComponent({
    components: { Number },
    props: { progress: {} },
    setup(props) {
      const wrapEl = ref(null)
      const textEl = ref(null)
      const baseStore = useBaseStore()

      const user: any = computed(() => baseStore.user)
      const growth: any = computed(() => {
        const data = {
          num: baseStore.articles.length,
          viewCount: baseStore.articles.map((x: any) => +x.view_count).reduce((a, b) => a + b, 0),
          diggCount: baseStore.articles.map((x: any) => +x.digg_count).reduce((a, b) => a + b, 0),
          collectCount: baseStore.articles.map((x: any) => +x.collect_count).reduce((a, b) => a + b, 0),
        }
        return data
      })

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
          targets: wrapEl.value,
          autoplay: false,
        })

        const right = wrapEl.value.getBoundingClientRect().right

        seekAnim
          .add({
            targets: '.info span',
            translateX: -(right / 2),
          })
          .add({
            //   scaleY: [0, 1],
            //   opacity: [0.5, 1],
            translateX: right / 3,
            easing: 'easeOutExpo',
            duration: 500,
            delay: 800,
          })
          .add({
            targets: '.info span',
            opacity: 1,
            translateX: 0,
            delay: anime.stagger(500), // delay starts at 500ms then increase by 100ms for each elements.
          })
          .add({
            duration: 1000,
            delay: 1500,
          })
      })

      return { wrapEl, textEl, user, growth }
    },
  })
</script>

<style scoped>
  .info {
    position: absolute;
    /* opacity: 0; */
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 3.4vw;
    margin-right: 40vw;
  }
  .info span {
    margin-bottom: 1rem;
    opacity: 0;
  }

  .wrap {
    height: 100%;
  }
  .sticky-wrap {
    width: 20rem;
    background-color: #fff;
    border-radius: 2px;
    line-height: 1.2;
  }
  .stat-block .block-title {
    padding: 1.333rem;
    font-size: 1.333rem;
    font-weight: 600;
    color: #31445b;
    border-bottom: 1px solid rgba(230, 230, 231, 0.5);
  }
  .shadow {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  }
  /* .stat-block {
  margin-bottom: 1rem;
} */
  .stat-block .block-body {
    padding: 1.333rem;
  }
  .stat-item {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    color: #000;
  }
  .follow-block {
    display: flex;
    position: relative;
    /* margin-bottom: 1rem; */
  }
  .follow-block .follow-item {
    flex: 1 1 auto;
    font-size: 1.25rem;
    padding: 1.333rem 0;
    text-align: center;
    color: #31445b;
  }
  .stat-item:not(:last-child) {
    margin-bottom: 0.8rem;
  }
  .stat-item .icon,
  .stat-item .zan {
    flex: 0 0 auto;
    margin-right: 1.2rem;
  }
</style>
