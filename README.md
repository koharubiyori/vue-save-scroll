## 简介

一个在 vue 项目中用来保存和恢复滚动容器的滚动条进度的工具包。

## 安装

```
npm i vue-save-scroll  // or
yarn add vue-save-scroll
```

## 用法

该包共导出了 4 个成员：

- **ScrollView**：滚动容器，实际的 DOM 标签为`<div>`
- **saveScrollMixin**：以混入形式使用，对页面中所有的 **ScrollView** 组件进行滚动条进度保存与恢复，分别在`activated`和`beforeRouteLeave`生命周期中进行，也就是说你需要在带缓存(keep-alive)的组件或路由中使用。
- **saveWindowScrollMixin**：以混入形式使用，保存与恢复当前页面的窗口滚动条进度，用法与`saveScrollMixin`相同。
- **saveWindowScroll**：保存

**ScrollView** 的 props：

- `save-x` 保存 x 轴，默认为`true`
- `save-y` 保存 y 轴，默认为`true`

**ScrollView** 组件拥有以下实例方法，你可以通过 ref 的形式进行调用：

- `saveScroll` 保存滚动条进度
- `loadScroll` 读取滚动条进度
- `getSavedScroll` 获取上一次保存的滚动条进度

## 示例

```vue
<template>
  <!-- 以下所有scroll-view组件的滚动条进度都会在页面跳转时保存，在返回时恢复 -->
  <scroll-view>
    <main>
      <scroll-view>
        <p>Some text.</p>
        <p>Some text.</p>
        <p>Some text.</p>
      </scroll-view>
    </main>

    <footer>
      <!-- 这里演示如何在非页面跳转的情况保存和恢复滚动条 -->
      <button @click="visibleScrollView ? hide() : show()">toggle</button>
      <scroll-view v-if="visibleScrollView" ref="scrollView"></scroll-view>
      <div v-else></div>
    </footer>
  </scroll-view>
</template>

<script>
import { ScrollView, saveScrollMixin } from 'vue-save-scroll'
export default {
  components: {
    ScrollView
  },

  mixins: [saveScrollMixin],

  data() {
    return {
      visibleScrollView: true
    }
  },

  methods: {
    show() {
      this.visible = true
      this.$nextTick(this.$refs.scrollView.$el.loadScroll) // 读取
    },

    hide() {
      this.visible = false
      this.refs.scrollView.$el.saveScroll() //  保存
    }
  }
}
</script>
```
