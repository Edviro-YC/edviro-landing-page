import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/** Progressive enhancement: server-rendered content stays readable without JS. */
export function useScrollReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined
  let motion: MediaQueryList | undefined

  const start = () => {
    observer?.disconnect()
    const elements = root.value?.querySelectorAll<HTMLElement>('[data-reveal], .media, .sm') ?? []
    if (motion?.matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.remove('anim')
        element.classList.add('in')
      })
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('in')
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => {
      element.classList.add('anim')
      element
        .querySelectorAll('.ill-chart path[stroke]')
        .forEach((path) => path.setAttribute('pathLength', '1'))
      observer?.observe(element)
    })
  }

  onMounted(() => {
    motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    motion.addEventListener('change', start)
    start()
  })
  onBeforeUnmount(() => {
    observer?.disconnect()
    motion?.removeEventListener('change', start)
  })
}
