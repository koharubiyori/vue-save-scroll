<template>
  <!-- 滚动容器，本身只是一个div，不包含任何样式 -->
  <div class="scroll-view">
    <slot></slot>
  </div>
</template>

<script>
import { scrolls } from './saveScrollMixin.js'
/**
 * 针对非页面跳转时保存和恢复进度条，对外暴露两个方法：saveScroll、loadSavedScroll
 */
export default {
  name: 'scrollView', // 为组件命名，用来在组件树上标记
  props: {
    saveX: {
      type: Boolean,
      default: true
    },

    saveY: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {}
  },

  methods: {
    // 保存当前的滚动条进度
    saveScroll() {
      scrolls[this._uid] = {
        top: this.$el.scrollTop,
        left: this.$el.scrollLeft
      }
    },

    // 载入当前滚动条进度
    loadScroll() {
      scrolls[this._uid] && this.$el.scrollTo(scrolls[this._uid])
    },

    // 获取上一次保存的滚动条进度
    getSavedScroll() {
      return scrolls[this._uid]
    }
  }
}
</script>
