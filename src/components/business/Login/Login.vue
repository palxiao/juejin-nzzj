<template>
  <div v-show="show" class="login">
    <div class="test-wrapper-3" style="width: 480px">
      <div class="newsletter">
        <div>
          <h2>{{ loading ? '信号接收中稍等一会...' : '输入你的掘金ID：' }}</h2>
          <p style="color: #888">(获取的数据均为账号公开信息,请放心使用~)</p>
        </div>

        <form action="" style="margin-bottom: 1.2rem">
          <div class="c-input-group">
            <label for="newsletter" class="c-label sr-only"></label>
            <input v-model="id" type="text" class="c-input" id="newsletter" placeholder="主页链接URL的末尾数字" />
          </div>
          <button @click="done" :class="['c-button', { loading }]">{{ loading ? '请稍候 ..' : '让我康康!' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useBaseStore } from '@/stores/base'

  export default defineComponent({
    props: {},
    setup(props, context) {
      let show = ref(true)
      let id = ref('2682464103060541')
      let loading = ref(false)
      const baseStore = useBaseStore()

      onMounted(async () => {
        document.body.style.overflow = 'hidden'
      })

      const done = async (e: any) => {
        e.preventDefault()
        if (loading.value) {
          return
        }
        loading.value = true
        const { data } = await axios.get(`https://juejin.palxp.com/user?id=${id.value}`)
        // console.log(data.result.list)
        console.log(data.result.user)
        if (data.result.user.name) {
          baseStore.setArticles(data.result.list)
          baseStore.setUser(data.result.user)
          document.body.style.overflow = 'auto'
          show.value = false
          context.emit('done')
          pullDiscuss()
        } else {
          loading.value = false
        }
      }

      async function pullDiscuss() {
        const res = await axios.get(`https://juejin.palxp.com/discuss?id=7184712051171229755`)
        // 👇🏻pick自2022年终总结、2022年中总结
        const preset = [
          '加油~ @弹幕员头子',
          '加油，祝好运 @小虎牙007',
          '祝好 同样被裁，加油！ @史远的影子不见了',
          '加油, 祝好 @_音魂不散_',
          '加油，感觉广州还是比较多公司，早点回去过年，年后上班呗[思考] @XiangLiuXing',
          '加油 @断桥落雪',
          '你还算年轻了，技术、生活都很积极，前途是有的。@海岛老哥 re: 感谢评论🍺 今年大部分人都一样不太顺利，也只能抱团取暖，相互慰藉了。希望来年都能顺利些 re: 谢谢[握手]',
          '相同的经历，只不过到这个月30号，😅，也属于PHP的重灾区 @九夜',
          '当你玩永恩的时候，我玩压缩可好 @Mating re: 退役了',
          '莫名的同感，加油吧 @纵倾童鞋',
          '来过~ @TF男孩 re: [击掌]',
          '优秀的人 @wayne214 re: [比心]',
          '放平心态，我也马上要加入找工作大军了 @德丽莎敲可爱',
          '君子不镜于水，而镜于人。镜于水，见面之容。镜于人，则知吉凶。《墨子·十八章·非攻》 @周杰伦好屌啊',
          '做就是了，前路也需很漫长，但总会有光明的一天 @Andy_jiahe re: [比心]',
          '唯有风雨兼程，才能练就不坏之身。加油，少年人。 @Asscre re: [比心]',
          '加油！！！工作会找到的 只是时间问题。 @程序视界晓龙 re: [比心]',
          '加油 滑动页面写的真棒 @用户5137758311591 re: [比心]',
          '大佬加油 @梨花苑沉叹 re: [比心]',
          '加油 @小道大成 re: [比心]',
          '祝好 @rexkentzheng re: [比心]',
          '加油💪🏻工作会找到的，不要太焦虑。 @我叫陈龙',
          '大佬真的强 @Ryzen',
          '大佬牛逼啊 @MrYZhou',
          '挺不错的啊，喜欢折腾，才能进步 @BigKongfuPanda',
          '我要有这么牛，我老板天天给我带早饭[微笑][呲牙] @用户872394124754',
          '老哥真滴强 @苏卿',
          '有操作的啊，老哥，加油 @any_way',
        ]
        baseStore.setDanmu(res.data.result.concat(preset))
      }

      return {
        id,
        done,
        show,
        loading,
      }
    },
  })
</script>

<style scoped>
  .loading {
    animation: blink 2s infinite;
  }
  .login {
    position: fixed;
    background: rgba(255, 255, 255, 0.4);
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .test-wrapper-3 {
    container-type: inline-size;
    resize: horizontal;
    overflow: auto;
    margin: 0 auto;
    width: 500px;
    padding: 1rem;
  }

  .c-input {
    border: none;
    appearance: none;
    box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.05);
    border: 2px solid rgba(0, 170, 188, 0.16);
    border-radius: 29px;
    font-size: 18px;
    padding: 12px 24px;
    width: 100%;
    resize: none;
    transition: border 0.5s;
  }

  .c-button {
    appearance: none;
    justify-self: start;
    border-radius: 100px;
    padding: 0.5rem 1rem;
    color: #fff;
    background: #01aabc;
    border: none;
    outline: none;
    display: inline-block;
    transition: 0.3s ease-out;
    font-size: 16px;
    cursor: pointer;
  }

  .newsletter {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    background-color: #f7f7f7;
    margin: 3rem auto;
    padding: 1rem;
    outline-offset: 3px;
    border-radius: 16px;
  }
  .newsletter h2 {
    font-weight: 700;
    font-size: 1.25rem;
  }
  .newsletter p {
    display: none;
  }
  .newsletter form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 0 1 400px;
  }
  .newsletter .c-button {
    min-width: 120px;
    width: 100%;
  }

  @container (min-width: 400px) {
    .newsletter form {
      flex-direction: row;
      align-items: flex-start;
    }
    .newsletter h2 {
      font-size: 2rem;
    }
    .newsletter p {
      display: block;
    }
    .newsletter .c-input-group {
      flex: 1;
    }
    .newsletter .c-button {
      width: unset;
      align-self: normal;
    }
  }
  @container (min-width: 600px) {
    .newsletter {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
