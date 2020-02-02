export const scrolls = {}   // 保存所有进度条的进度

export default {
  // 进入时读取进度条数据
  activated() {
    ; (function throughChildren(instance) {
      instance.$children.forEach(vElement => {
        if (/-scrollView$/.test(vElement.$vnode.tag)) {
          if (scrolls[vElement._uid]) {
            vElement.$nextTick(() => vElement.$el.scrollTo(scrolls[vElement._uid]))
          }
        }

        vElement.$children.length && throughChildren(vElement)
      })
    })(this)
  },

  // 离开时保存
  beforeRouteLeave(to, from, next) {
    ; (function throughChildren(instance) {     // 遍历组件树
      instance.$children.forEach(vElement => {
        if (/-scrollView$/.test(vElement.$vnode.tag)) {      // 检查是否为滚动容器组件，这个值是由组件的name属性决定的
          scrolls[vElement._uid] = {
            top: vElement.saveY ? vElement.$el.scrollTop : 0,
            left: vElement.saveX ? vElement.$el.scrollLeft : 0
          }
        }

        vElement.$children.length && throughChildren(vElement)
      })
    })(this)

    next()
  }
}