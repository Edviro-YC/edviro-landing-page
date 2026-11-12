import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { mountAwesomicMotion } from '@/components/design/awesomicMotion.js'

export function useAwesomicMotion(root: Ref<HTMLElement | null>) {
  let dispose: (() => void) | undefined
  let motion: MediaQueryList | undefined
  const start = () => {
    dispose?.()
    if (root.value) dispose = mountAwesomicMotion(root.value)
  }
  onMounted(() => {
    motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    motion.addEventListener('change', start)
    start()
  })
  onBeforeUnmount(() => {
    dispose?.()
    motion?.removeEventListener('change', start)
  })
}
