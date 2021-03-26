<!--
 * @Author: imthelin
 * @since: 2021-03-26 11:53:10
 * @lastTime: 2021-03-26 13:34:26
 * @LastAuthor: Do not edit
 * @FilePath: /vue-press-blog/docs/work/accumulate/js/throttle-debounce.md
 * @Description:
-->

### 定义和作用

首先需要明确的是，他们的目的都是用来节省不必要的函数开销。

防抖: 指定一个延迟时间 delay，在这个时间内多次触发一个函数，这个函数只会执行一次，并以最后一次触发时间为准，在 delay 事件后执行这个函数。

防抖就是法师发动技能前的吟唱，如果被打断就需要重新吟唱，然后才能发动成功。

比如英雄联盟的回城，诺手在兵线上回城，提莫看不下去了，你小子瞧不起谁呢，普通攻击，诺手被打断回城，重新发动回城，提莫又打断，如果提莫一直打断诺手的回城，诺手永远回不了城，直到提莫放过他。

节流: 指定一个间隔时间 interval，在 interval 之内多次触发，只会执行 interval 最后一次触发。

节流就像 fps 游戏的鼠标按住射击行为，射速（单位时间内事件触发次数有限）需要限制。

它们的区别是，节流只要事件触发就会执行一次，不停的触发也是按照间隔时间去执行，而防抖是永远只触发最后一次。

#### 防抖

```js
function debounce(fn, delay) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = null
    // 支持不定入参数，或者函数入参数定义为 ...args（es6 语法）
    let args = [...arguments]
    let self = this
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, delay)
  }
}
```

#### 节流

```js
function throttle(fn, interval) {
  let timer
  let last
  return function () {
    let now = new Date()
    let self = this
    let args = [...arguments]
    if (last && last + interval > now) {
      setTimeout(() => {
        last = now
        fn.apply(self, args)
      }, interval)
    } else {
      last = now
      fn.apply(self, args)
    }
  }
}
```
