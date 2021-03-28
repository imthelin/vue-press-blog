<!--
 * @Author: imthelin
 * @since: 2021-03-26 15:02:28
 * @lastTime: 2021-03-28 23:21:20
 * @LastAuthor: Do not edit
 * @FilePath: /vue-press-blog/docs/work/accumulate/js/map-vs-object.md
 * @Description:
-->

### Map vs Object

`Map`: 键名可以是任何数据类型，可以快速获取对象长度， `map.size`, 支持 `for of`（有自身的迭代器协议）。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

`Object`: 键名只能是字符串或者 `Symbol` 。获取长度需要先 `Object.keys(obj)`，循环只能 `for in` 。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

下面是一个记录分析，都给他们 10000000 个属性，先挨个遍历塞入，你可以把这段代码拿到你的浏览器控制台下或者 `node` 环境中运行。

```js
let theMap = new Map()
let theObj = new Object()
const loopTimes = 10000000

console.time('object generate')
for (let index = loopTimes; index--; ) {
  theObj[index] = index
}
console.timeEnd('object generate')

console.time('map generate')
for (let index = loopTimes; index--; ) {
  theMap.set(index, index)
}
console.timeEnd('map generate')

let res

console.time('object get')
res = theObj.hasOwnProperty('999999')
console.timeEnd('object get')

console.time('map get')
res = theMap.has(99999)
console.timeEnd('map get')

console.time('object set')
theObj['999999'] = '99'
console.timeEnd('object set')

console.time('map set')
theMap.set(99999, '99')
console.timeEnd('map set')

console.time('object delete')
delete theObj['999999']
console.timeEnd('object delete')

console.time('map delete')
theMap.delete(99999)
console.timeEnd('map delete')
```
---
结果如下：

``` c
// node v12.21.0 运行结果
object generate: 1275.677ms
map generate: 3516.865ms

object get: 0.009ms
map get: 0.006ms

object set: 0.007ms
map set: 0.008ms

object delete: 0.009ms
map delete: 0.003ms
```

``` c
// chrome 89.0.4389.90（正式版本） (x86_64)
object generate: 714.7861328125 ms
map generate: 2492.907958984375 ms

object get: 0.031005859375 ms
map get: 0.005859375 ms

object set: 0.02490234375 ms
map set: 0.003173828125 ms

object delete: 0.005126953125 ms
map delete: 0.0048828125 ms
```

从结果来看，大数据量记录 `Map` 在生成阶段是慢于 `Object` 的，但是从获取、设置、删除来看，性能都是更好的。我想这或许跟生成阶段做了一些优化和准备工作有关。
结合到日常工作中，我们的记录字段并不多，也就是生成速度两者几乎一致，但是读取操作速度 `Map` 却胜过 `Object`，所以我们应该把 `Map` 用到工作中了。

