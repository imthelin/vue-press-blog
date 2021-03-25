<!--
 * @Author: imthelin
 * @since: 2021-03-25 12:33:37
 * @lastTime: 2021-03-25 12:51:21
 * @LastAuthor: Do not edit
 * @FilePath: /vue-press-blog/docs/work/accumulate/js/vue-plugin.md
 * @Description:
-->

### 插件

插件通常用来给 Vue 增加一些全局的功能，可以理解成增强 Vue 的能力，就像一个英雄点了更多的技能。这些技能分类大概如下：

1. 全局方法或者 property，比如 `Vue.someFn = ...`
2. 全局资源：指令、过滤器、过渡
3. 混入 mixin
4. 给实例添加方法，`Vue.prototype.someFn = ...`
5. 一个库，提供自己的 API,同时提供上述这些能力，比如 vueX vue-router

#### 使用插件

通过全局方法 Vue.use() 去使用插件，保证在实例化之前即可。
pluginOpt 是可选的，主要是看你的插件是否支持更丰富的自定义功能。

``` js {1}
Vue.use(thePlugin, pluginOpt)
...

new Vue({
  el: '',
  ...
})
```

#### 开发插件

插件必须暴露一个 `install` 方法，这个方法第一个参数是 `Vue` 构造器，第二个就是插件的选项，如上对 `pluginOpt` 的解释。

``` js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

参考下 ` Vue.use`

``` js
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```
