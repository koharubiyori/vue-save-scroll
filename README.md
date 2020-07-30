## 简介

一个在 vue 项目中用来保存和恢复滚动容器的滚动条进度的组件。

## 安装

```
npm i vue-save-scroll  // or
yarn add vue-save-scroll
```

## 用法

共导出了 5 个成员：

- **ScrollView**：滚动容器，标记哪些内容需要保存滚动进度，支持嵌套。实际的 DOM 标签为`<div>`，默认样式为`overflow:auto`。
- **saveScrollMixin**：以混入形式使用，对当前组件及其子组件中所有的 **ScrollView** 组件进行滚动条进度保存与恢复，分别在`activated`和`beforeRouteLeave`生命周期中进行，也就是说你需要在带缓存(keep-alive)的组件或路由中使用。
- **saveWindowScrollMixin**：以混入形式使用，保存与恢复当前页面的窗口(window)滚动条进度，用法与`saveScrollMixin`相同。
- **saveWindowScroll**：手动执行保存当前页面的窗口(window)滚动条进度，需传入当前组件实例(this)
- **getSavedWindowScroll**：获取上一次保存的窗口(window)滚动条进度，需传入当前组件实例(this)

**ScrollView** 的 props：

- `save-x` 保存 x 轴滚动条进度，默认为`true`
- `save-y` 保存 y 轴滚动条进度，默认为`true`

**ScrollView** 组件拥有以下实例方法，你可以通过 ref 的形式进行调用：

- `saveScroll` 保存滚动条进度，一般只在非跳转页面时需要保存滚动进度条的情况下使用
- `loadScroll` 读取滚动条进度，同上
- `getSavedScroll` 获取上一次保存的滚动条进度

## 示例
``` html
<template>
  <div class="homePage">
    <button @click="$router.push('/about')">gotoAbout</button>
    <!-- 回到这个页面时，这个容器就会恢复滚动条进度 -->
    <scroll-view class="scrollView">
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
      <p>Some text.</p>
    </scroll-view>
  </div>
</template>

<script>
import { ScrollView, saveScrollMixin } from 'vue-save-scroll'
export default {
  components: {
    ScrollView
  },

  mixins: [saveScrollMixin],
}
</script>

<style>
.scrollView {
  height: 200px;
}
</style>
```
