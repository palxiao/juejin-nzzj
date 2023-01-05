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
  import { defineComponent, ref, onMounted, defineExpose } from 'vue'
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

      function pullDiscuss() {
        baseStore.pullDiscuss()
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
    /* display: none; */
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
