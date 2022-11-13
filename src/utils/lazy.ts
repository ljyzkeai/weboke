/* 图片懒加载 */
import loadGif from '@/assets/image/load.gif'
export default {
  mounted(el) {
    const elImg = el.src
    el.src = loadGif
    const observe = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting == true) {
        setTimeout(() => {
          el.src = elImg
          observe.unobserve(el)
        }, 1000)
      }
    })
    observe.observe(el)
  },
}
