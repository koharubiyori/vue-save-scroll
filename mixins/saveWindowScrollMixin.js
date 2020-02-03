export const scrolls = {}

export default {
  activated() {
    if (scrolls[this._uid]) {
      const { x, y } = getSavedWindowScroll(this)
      window.scrollTo(x, y)
    }
  },

  beforeRouteLeave(to, from, next) {
    saveWindowScroll(this)
    next()
  }
}

export function saveWindowScroll(currentViewInstance) {
  scrolls[currentViewInstance._uid] = {
    x: window.scrollX,
    y: window.scrollY
  }
}

export function getSavedWindowScroll(currentViewInstance) {
  return scrolls[currentViewInstance._uid]
}