/*
 * @Author: imthelin
 * @since: 2021-03-07 17:33:36
 * @lastTime: 2021-03-07 22:49:52
 * @LastAuthor: Do not edit
 * @FilePath: /vue-press-blog/docs/.vuepress/config.js
 * @Description:
 */

module.exports = {
  title: 'fizz', // 设置网站标题
  description: '个人博客',
  // 这是部署到github相关的配置
  base: '/blog/',
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '2.png' }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '2.png' }]
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    logo: '/2.png', // 左上角logo
    nav: [
      // 导航栏配置
      {
        text: '前端',
        link: '/work/accumulate/'
      },
      { text: 'Node', link: '/work/node/' },
      { text: '算法', link: '/work/algorithm/' },
      {
        text: '工具',
        link: '/work/tools/',
        // items: [
        //   { text: 'vue-press', link: '/tools/vue-press/' },
        // ]
      },
      { text: 'git', link: 'https://github.com/imthelin' }
    ],

    // sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 3, // 侧边栏显示2级
    // 为以下路由添加左侧边栏
    sidebar: {
      '/work/accumulate/': [
        {
          title: 'js',
          collapsable: false,
          children: [
            { title: '原型', path: '/work/accumulate/js/' }
          ]
        },
        { title: 'html', link: '/work/accumulate/html/' },
        { title: 'css', link: '/work/accumulate/css/' }
      ],
      '/work/tools/': [
        { title: 'vue-press', path: '/work/tools/vue-press/' },
        { title: '博客模板', path: '/work/tools/template/' }
      ],
      '/work/node/': [
        { title: 'Buffer', path: '/work/node/buffer' },
      ],
    },

    smoothScroll: true
  },
  plugins: [
    // 返回顶部
    ['@vuepress/back-to-top'],
    // 加载进度条
    ['@vuepress/nprogress'],
    // PWA, 当用户没有网的情况下,一样能继续的访问我们的网站
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    // 固定组件
    [
      {
        name: 'page-plugin',
        // globalUIComponents: ['fixed']
      }
    ],
    [
      // 'vuepress-plugin-comment',
      // {
      //   choosen: 'valine',
      //   // options选项中的所有参数，会传给Valine的配置
      //   options: {
      //     el: '#vue-press',
      //     appId: 'ClHcJcBArLdz0qMQeeTt97Bi-gzGzoHsz',
      //     appKey: 'RtkDB1E100igbWOnCvNVwHsk'
      //   }
      // }
    ]
  ],
  serviceWorker: true // 是否开启 PWA
}
