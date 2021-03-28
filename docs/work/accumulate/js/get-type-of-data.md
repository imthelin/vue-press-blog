<!--
 * @Author: imthelin
 * @since: 2021-03-28 21:10:48
 * @lastTime: 2021-03-28 23:13:22
 * @LastAuthor: Do not edit
 * @FilePath: /vue-press-blog/docs/work/accumulate/js/get-type-of-data.md
 * @Description:
-->

### JS 数据类型和判断

#### 数据类型有哪些

- 基本数据类型：String\Number\Boolean\Undefined\Null\Bigint\Symbol
- 引用数据类型：Object\Function\Date\Reg\Map\Set

#### 判断方法有哪些
- `typeof` 基本数据类型
- `instanceof` 引用数据类型
- `Object.prototype.toString.call(value)`
- `Array.isArray(value)` 判断数组很方便
- `isNaN` 判断是否是数字，注意全局下和 `ES6 Number.isNaN()` 区别
- `!!(obj && obj.nodeType === 1)` 判断 `DOM` 节点

#### 方法实践

当遇到引用数据类型， `typeof` 无法识别具体的引用数据类型。如下例子中，它可以区分基本数据类型，还可以区分引用数据类型中的 `function` ，但是对于引用数据类型中的 `Object Date Reg` ，全都判断为 `object` ,这意味着我们需要其他的方式去识别引用数据类型。

```js
// 基本数据类型
console.log(typeof '123', 'typeof "123"')
console.log(typeof 123, 'typeof 123')
console.log(typeof true, 'typeof true')
console.log(typeof undefined, 'typeof undefined')
console.log(typeof null, 'typeof null')
console.log(typeof Symbol(1), 'typeof Symbol(1)')
console.log(typeof BigInt(1123), 'typeof BigInt(1123)')

// 当遇到引用数据类型
console.log(typeof {}, 'typeof {}')
console.log(typeof function () {}, 'typeof function () { }')
console.log(typeof new Date(), 'typeof new Date()')
console.log(typeof new RegExp(), 'typeof new RegExp()')

// 结果如下
// string typeof "123"
// number typeof 123
// boolean typeof true
// undefined typeof undefined
// object typeof null
// symbol typeof Symbol(1)
// bigint typeof BigInt(1123)
// object typeof {}
// function typeof function () { }
// object typeof new Date()
// object typeof new RegExp()
```

既然 `typeof` 无法满足我们，那我们用 `instanceof` 来判断下引用数据类型。本文最底部我们自己实现一个 `instanceof` 。

```js
console.log({} instanceof Object, '{} instanceof Object')
console.log(
  function () {} instanceof Function,
  'function () { } instanceof Function'
)
console.log(new Date() instanceof Date, 'new Date() instanceof Date')
console.log(new RegExp() instanceof RegExp, 'new RegExp() instanceof RegExp')

// 结果如下
// true {} instanceof Object
// true function () { } instanceof Function
// true new Date() instanceof Date
// true new RegExp() instanceof RegExp
```

目前看起来一切正常，我们能够分别引用数据类型了，但是这里依然存在一个问题，当我们遇到一个引用数据类型，我们总不能一个类型一个类型去试。我们需要自己实现一个方法，用来直接返回数据类型。`instanceof` 能判断这个实例的原型链上是否存在目标构造器。

#### 自定义判断方法
在任何值上调用 Object 原生的 toString() 方法，都会返回一个 [object NativeConstructorName] 格式的字符串。

::: warning
需要注意的是，但是它不能检测非原生构造函数的构造函数，这点非常关键。
:::

所以下面这个实现的方法我们只能用来判断原生的构造函数，涉及到自己实现的类判断还是需要用 `instanceof` 。

``` js
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
```

如果只是一个简单的判断是否是对象，以下实现即可。
``` js
isObject: function(obj){
  var type = typeof obj;
  return type === 'function' || typeof === 'object' && obj !== null;
}
```


#### 实现一个 instanceof
```js
function theInstanceof(val, constructor) {
  let pro = Object.getPrototypeOf(val)
  while (pro) {
    if (pro !== constructor.prototype) {
      pro = Object.getPrototypeOf(pro)
    } else {
      return true
    }
  }
  return false
}
console.log(theInstanceof({}, Object))
// true
```
