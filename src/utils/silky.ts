/*
 * @Author: ShawnPhang
 * @Date: 2023-08-30 09:31:43
 * @Description: 阻尼滚动
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-08-30 09:39:42
 */
const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end; // 对两个值进行线性插值 (0 <= amt <= 1)
const damp = (x: number, y: number, lambda: number, dt: number) => lerp(x, y, 1 - Math.exp(-lambda * dt)) // 阻尼效果
const clamp = (min: number, input: number, max: number) => Math.max(min, Math.min(input, max)) // 获取一个中间值
let targetScroll = 0;
let animatedScroll = 0;
let timeRecord = 0
// let easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 缓入缓出函数（ease-in-out）慢快慢
// let easing = (t) => 1 - Math.pow(1 - t, 2) // 指数反向缓动函数（easeOut）先快后慢
// let easing = (t) => t // 线性

export default class Silky {
  lerp: number
  duration: number
  easing: Function
  content: HTMLElement
  currentTime: number = 0
  value: number = 0
  onUpdate: Function = () => {}
  from: number = 0
  to: number = 0
  
  constructor({ lerp, duration, easing = (t: number) => 1 - Math.pow(1 - t, 2), content }: any) {
    this.lerp = isNaN(lerp) ? 0.1 : lerp
    this.duration = duration || 1;
    this.easing = easing;
    this.content = content || document.documentElement
    const onWeel = (e: any) => {
      e.preventDefault();
      this.onVirtualScroll(targetScroll + e.deltaY);
    }
    this.content.addEventListener('wheel', onWeel, { passive: false });
  }

  advance(deltaTime: number) {
    if (this.lerp) {
      // this.value = lerp(this.value, this.to, this.lerp);
      this.value = damp(this.value, this.to, this.lerp * 60, deltaTime)
    } else {
      this.currentTime += deltaTime
      const linearProgress = clamp(0, this.currentTime / this.duration, 1)
      const easedProgress = this.easing ? this.easing(linearProgress) : 1
      this.value = this.from + (this.to - this.from) * easedProgress
    }
    this.onUpdate?.(this.value);
  }

  onVirtualScroll(target: number) {
    this.from = this.value = animatedScroll;
    this.to = target;
    this.currentTime = 0;
    this.onUpdate = (value: number) => {
      animatedScroll = value;
      this.content.scrollTop = animatedScroll;
      targetScroll = value;
    }
  }

  raf(time: number) {
    const deltaTime = time - (timeRecord || time);
    timeRecord = time;
    this.advance(deltaTime * 0.001);
  }
}