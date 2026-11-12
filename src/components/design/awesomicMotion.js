/**
 * Awesomic's original page controllers, with queries scoped to the mounted page.
 * Events, observers, timers and animation frames are disposed together on route changes.
 * The rotating homepage hero stack is deliberately not included.
 */
export function mountAwesomicMotion(root) {
  const nativeDocument = window.document,
    lifetime = new AbortController()
  let disposed = false
  const observers = new Set(),
    timeouts = new Set(),
    intervals = new Set(),
    frames = new Set()
  const listen = (target, event, handler, options = {}) =>
    target.addEventListener(event, handler, { ...options, signal: lifetime.signal })
  const addEventListener = (event, handler, options = {}) => listen(window, event, handler, options)
  const scopedElement = (element) => {
    root
      .getAttributeNames()
      .filter((name) => name.startsWith('data-v-'))
      .forEach((name) => element.setAttribute(name, ''))
    return element
  }
  root
    .querySelectorAll('.anim,.loop.in,.logo-wall.in,.hl.auto')
    .forEach((element) => element.classList.remove('anim', 'in', 'auto'))
  root.classList.add('motion-enabled')
  const document = {
    querySelector: (selector) => root.querySelector(selector),
    querySelectorAll: (selector) => root.querySelectorAll(selector),
    createElement: (...args) => scopedElement(nativeDocument.createElement(...args)),
    createElementNS: (...args) => scopedElement(nativeDocument.createElementNS(...args)),
    fonts: nativeDocument.fonts,
    addEventListener: (event, handler, options = {}) =>
      listen(nativeDocument, event, handler, options),
  }
  class IntersectionObserver extends window.IntersectionObserver {
    constructor(callback, options) {
      super((...args) => {
        if (!disposed) callback(...args)
      }, options)
      observers.add(this)
    }
  }
  const requestAnimationFrame = (callback) => {
    const id = window.requestAnimationFrame((time) => {
      frames.delete(id)
      if (!disposed) callback(time)
    })
    frames.add(id)
    return id
  }
  const setTimeout = (callback, delay) => {
    const id = window.setTimeout(() => {
      timeouts.delete(id)
      if (!disposed) callback()
    }, delay)
    timeouts.add(id)
    return id
  }
  const clearTimeout = (id) => {
    window.clearTimeout(id)
    timeouts.delete(id)
  }
  const setInterval = (callback, delay) => {
    const id = window.setInterval(() => {
      if (!disposed) callback()
    }, delay)
    intervals.add(id)
    return id
  }
  const clearInterval = (id) => {
    window.clearInterval(id)
    intervals.delete(id)
  }

  // Original sticky platform navigation, using normal-flow anchors so earlier panels remain reachable.
  root.querySelectorAll('.platform').forEach((sec) => {
    const tabs = [...sec.querySelectorAll('.tabs a')],
      panels = [...sec.querySelectorAll('.panel')],
      bar = sec.querySelector('.bar')
    if (!panels.length || !bar) return
    const markers = panels.map(
      (panel) => root.querySelector('[data-panel-anchor="' + panel.id + '"]') ?? panel,
    )
    function update() {
      const mid = innerHeight * 0.5
      let active = 0
      markers.forEach((p, i) => {
        if (p.getBoundingClientRect().top < mid) active = i
      })
      tabs.forEach((t, i) => {
        t.classList.toggle('on', i === active)
        if (i === active) t.setAttribute('aria-current', 'location')
        else t.removeAttribute('aria-current')
      })
      const r = panels[0].parentNode.getBoundingClientRect()
      bar.style.setProperty('--p', Math.min(1, Math.max(0, (mid - r.top) / r.height)))
    }
    addEventListener('scroll', update, { passive: true })
    update()
    tabs.forEach((tab) =>
      listen(tab, 'click', (e) => {
        const id = tab.getAttribute('href')?.slice(1)
        const marker = root.querySelector('[data-panel-anchor="' + id + '"]')
        if (!marker) return
        e.preventDefault()
        marker.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth',
        })
        history.replaceState(null, '', '#' + id)
      }),
    )
  })

  ;(function () {
    var e = document.querySelector('.h-type')
    if (!e) return
    var t = e.textContent
    e.textContent = ''
    for (var k = 0; k < t.length; k++) {
      var c = document.createElement('i')
      c.textContent = t[k]
      c.style.animationDelay = (1 + k * 0.032).toFixed(3) + 's'
      e.appendChild(c)
    }
  })()
  ;(function () {
    var els = document.querySelectorAll('.cell b')
    if (!els.length) return
    var rm = matchMedia('(prefers-reduced-motion:reduce)').matches
    function run(el) {
      var t = el.dataset.t,
        n = t.match(/\d+/g)
      if (!n || rm) return
      var to = n.map(Number),
        d = 1600,
        s = performance.now()
      function f(now) {
        var p = Math.min((now - s) / d, 1),
          e = 1 - Math.pow(1 - p, 3),
          i = 0
        el.textContent = t.replace(/\d+/g, function () {
          return Math.round(to[i++] * e)
        })
        if (p < 1) requestAnimationFrame(f)
      }
      requestAnimationFrame(f)
    }
    var io = new IntersectionObserver(
      function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) {
            io.unobserve(x.target)
            run(x.target)
          }
        })
      },
      { threshold: 0.6 },
    )
    els.forEach(function (el) {
      el.dataset.t = el.dataset.t || el.textContent
      el.textContent = el.dataset.t
      if (rm) return
      el.textContent = el.dataset.t.replace(/\d+/g, '0')
      io.observe(el)
    })
  })()
  ;(function () {
    var l = document.querySelector('.loop')
    if (!l) return
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
      l.classList.add('in')
      return
    }
    var io = new IntersectionObserver(
      function (e) {
        if (e[0].isIntersecting) {
          l.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(l)
  })()
  ;(function () {
    var ms = document.querySelectorAll('.platform .media')
    if (!ms.length || !('IntersectionObserver' in window)) return
    ms.forEach(function (m) {
      m.querySelectorAll('.ill-chart path[stroke]').forEach(function (p) {
        p.setAttribute('pathLength', '1')
      })
      m.classList.add('anim')
    })
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.35 },
    )
    ms.forEach(function (m) {
      io.observe(m)
    })
  })()
  ;(function () {
    var v = document.querySelector('.sec-view')
    if (!v) return
    var pv = document.querySelector('.sec-prev'),
      nx = document.querySelector('.sec-next')
    function step() {
      var c = v.querySelector('.sec-card')
      return c.offsetWidth + 16
    }
    function upd() {
      pv.disabled = v.scrollLeft < 2
      nx.disabled = v.scrollLeft >= v.scrollWidth - v.clientWidth - 2
    }
    listen(pv, 'click', function () {
      v.scrollBy({
        left: -step(),
        behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth',
      })
    })
    listen(nx, 'click', function () {
      v.scrollBy({
        left: step(),
        behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth',
      })
    })
    listen(v, 'scroll', upd, { passive: true })
    addEventListener('resize', upd)
    upd()
  })()
  ;(function () {
    var st = document.querySelector('.pb-stage.nodes')
    if (!st) return
    var svg = st.querySelector('.wires'),
      NS = 'http://www.w3.org/2000/svg'
    function build() {
      var sr = st.getBoundingClientRect(),
        W = sr.width,
        H = sr.height,
        ns = st.querySelectorAll('.node')
      if (ns.length < 4) return
      function R(n) {
        var b = n.getBoundingClientRect()
        return {
          l: b.left - sr.left,
          r: b.right - sr.left,
          t: b.top - sr.top,
          b: b.bottom - sr.top,
          w: b.width,
          h: b.height,
        }
      }
      var bms = R(ns[0]),
        em = R(ns[1]),
        me = R(ns[2]),
        ow = R(ns[3])
      function row(n) {
        var o = n.querySelector('.nb')
        var b = o.getBoundingClientRect()
        return b.top + b.height / 2 - sr.top
      }
      var by = row(ns[0]),
        my = row(ns[2]),
        oy1 = ow.t + ow.h * 0.3,
        oy2 = ow.t + ow.h * 0.78,
        ex = em.l + em.w / 2
      var cx = (bms.r + ow.l) / 2
      var P = [
        {
          d:
            'M' +
            bms.r +
            ' ' +
            by +
            ' H' +
            (cx - 14) +
            ' Q' +
            cx +
            ' ' +
            by +
            ' ' +
            cx +
            ' ' +
            (by + 14) +
            ' V' +
            (oy1 - 14) +
            ' Q' +
            cx +
            ' ' +
            oy1 +
            ' ' +
            (cx + 14) +
            ' ' +
            oy1 +
            ' H' +
            ow.l,
          s: [bms.r, by],
          e: [ow.l, oy1],
          v: '0s',
        },
        { d: 'M' + ex + ' ' + em.b + ' V' + ow.t, s: [ex, em.b], e: [ex, ow.t], v: '1.6s' },
        { d: 'M' + me.r + ' ' + my + ' H' + ow.l, s: [me.r, my], e: [ow.l, oy2], v: '3.2s' },
      ]
      if (Math.abs(my - oy2) > 1) {
        var mx = (me.r + ow.l) / 2
        P[2].d =
          'M' +
          me.r +
          ' ' +
          my +
          ' H' +
          (mx - 12) +
          ' Q' +
          mx +
          ' ' +
          my +
          ' ' +
          mx +
          ' ' +
          (my + (oy2 > my ? 12 : -12)) +
          ' V' +
          (oy2 + (oy2 > my ? -12 : 12)) +
          ' Q' +
          mx +
          ' ' +
          oy2 +
          ' ' +
          (mx + 12) +
          ' ' +
          oy2 +
          ' H' +
          ow.l
      }
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H)
      svg.innerHTML = ''
      P.forEach(function (p) {
        var e = document.createElementNS(NS, 'path')
        e.setAttribute('d', p.d)
        e.setAttribute('class', 'w')
        e.setAttribute('pathLength', '1')
        e.style.setProperty('--d', p.v)
        svg.appendChild(e)
        ;[
          ['src', p.s],
          ['dst', p.e],
        ].forEach(function (q) {
          var c = document.createElementNS(NS, 'circle')
          c.setAttribute('cx', q[1][0])
          c.setAttribute('cy', q[1][1])
          c.setAttribute('r', 3.5)
          c.setAttribute('class', 'pt ' + q[0])
          c.style.setProperty('--d', p.v)
          svg.appendChild(c)
        })
      })
    }
    build()
    addEventListener('resize', build)
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(() => {
        if (!disposed) build()
      })
  })()
  ;(function () {
    var el = document.querySelector('.pb-after')
    if (!el || !('IntersectionObserver' in window)) return
    el.classList.add('anim')
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            el.classList.add('in')
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
  })()
  ;(function () {
    var dv = document.querySelector('.dv')
    if (!dv) return
    var D = [
      { tag: 'Anomaly', big: '+357%', small: 'vs. baseline', sub: 'AHU-3 · Site A · Jun 8, 2026' },
      {
        tag: 'Verified',
        big: '−18%',
        small: 'vs. baseline',
        sub: 'Measured against each building’s baseline',
      },
      {
        tag: 'Capital plan',
        big: '$31K / yr',
        small: 'saved by replacing',
        sub: 'Boiler 1 · 3-year plan, 2027–2029',
      },
    ]
    var sts = dv.querySelectorAll('.st'),
      axs = dv.querySelectorAll('.dv-axis'),
      rows = document.querySelectorAll('.drows button'),
      cur = -1,
      started = false
    function set(i) {
      if (i === cur) return
      cur = i
      dv.classList.add('sw')
      setTimeout(function () {
        ;['tag', 'big', 'small', 'sub'].forEach(function (k) {
          dv.querySelector('[data-k="' + k + '"]').textContent = D[i][k]
        })
        dv.classList.remove('sw')
      }, 180)
      sts.forEach(function (e, k) {
        e.classList.remove('on')
        if (k === i) {
          void e.offsetWidth
          e.classList.add('on')
        }
      })
      axs.forEach(function (e, k) {
        e.hidden = k !== i
      })
      rows.forEach(function (b, k) {
        b.classList.toggle('on', k === i)
        b.setAttribute('aria-selected', k === i ? 'true' : 'false')
      })
    }
    rows.forEach(function (b) {
      var i = +b.dataset.i
      listen(b, 'mouseenter', function () {
        if (started) set(i)
      })
      listen(b, 'focus', function () {
        if (started) set(i)
      })
      listen(b, 'click', function () {
        started = true
        set(i)
      })
    })
    function start() {
      started = true
      set(0)
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              start()
              io.disconnect()
            }
          })
        },
        { threshold: 0.35 },
      )
      io.observe(dv)
    } else start()
  })()
  ;(function () {
    var v = document.querySelector('.rview')
    if (!v) return
    var tr = v.querySelector('.rtrack'),
      sl = [].slice.call(tr.children),
      pv = document.querySelector('.r-prev'),
      nx = document.querySelector('.r-next'),
      ct = document.querySelector('.rcount b'),
      i = 0,
      rm = matchMedia('(prefers-reduced-motion:reduce)').matches,
      done = {}
    function count(el) {
      var n = +el.dataset.n,
        p = el.dataset.p || '',
        x = el.dataset.x || ''
      if (rm) {
        el.textContent = p + n + x
        return
      }
      var t0 = performance.now()
      ;(function f(t) {
        var k = Math.min(1, (t - t0) / 1100),
          e = 1 - Math.pow(1 - k, 3)
        el.textContent = p + Math.round(n * e) + x
        if (k < 1) requestAnimationFrame(f)
      })(t0)
    }
    function go(n) {
      i = Math.max(0, Math.min(sl.length - 1, n))
      tr.style.transform = 'translateX(-' + i * 100 + '%)'
      sl.forEach(function (s, k) {
        s.setAttribute('aria-hidden', k === i ? 'false' : 'true')
        s.inert = k !== i
      })
      pv.disabled = i === 0
      nx.disabled = i === sl.length - 1
      ct.textContent = i + 1
      if (!done[i] && seen) {
        done[i] = 1
        sl[i].querySelectorAll('[data-n]').forEach(count)
      }
    }
    var seen = false
    listen(pv, 'click', function () {
      go(i - 1)
    })
    listen(nx, 'click', function () {
      go(i + 1)
    })
    listen(v, 'keydown', function (e) {
      if (e.key === 'ArrowLeft') go(i - 1)
      if (e.key === 'ArrowRight') go(i + 1)
    })
    var sx = null
    listen(v, 'pointerdown', function (e) {
      sx = e.clientX
    })
    listen(v, 'pointerup', function (e) {
      if (sx === null) return
      var d = e.clientX - sx
      if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1))
      sx = null
    })
    go(0)
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              seen = true
              io.disconnect()
              go(i)
            }
          })
        },
        { threshold: 0.3 },
      )
      io.observe(v)
    } else {
      seen = true
      go(0)
    }
  })()
  ;(function () {
    var w = document.querySelector('.logo-wall')
    if (!w || !('IntersectionObserver' in window)) return
    w.classList.add('anim')
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            w.classList.add('in')
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(w)
  })()
  ;(function () {
    var fs = [].slice.call(document.querySelectorAll('.fq'))
    function set(f, o) {
      f.classList.toggle('open', o)
      f.querySelector('button').setAttribute('aria-expanded', o ? 'true' : 'false')
    }
    fs.forEach(function (f) {
      listen(f.querySelector('button'), 'click', function () {
        var o = !f.classList.contains('open')
        fs.forEach(function (g) {
          set(g, false)
        })
        set(f, o)
      })
    })
  })()
  ;(function () {
    var r = document.querySelector('[data-wku]')
    if (!r) return
    var tabs = r.querySelectorAll('.wku-l button'),
      sl = r.querySelectorAll('.wku-s'),
      i = 0,
      t,
      paused = false,
      pp = r.querySelector('.wku-pp')
    function go(n) {
      i = (n + tabs.length) % tabs.length
      tabs.forEach(function (b, k) {
        b.classList.toggle('on', k === i)
        b.setAttribute('aria-selected', k === i)
      })
      sl.forEach(function (x, k) {
        x.classList.toggle('on', k === i)
      })
    }
    function arm() {
      clearInterval(t)
      if (!paused && !matchMedia('(prefers-reduced-motion:reduce)').matches)
        t = setInterval(function () {
          go(i + 1)
        }, 6000)
    }
    tabs.forEach(function (b, k) {
      listen(b, 'click', function () {
        go(k)
        arm()
      })
    })
    listen(r.querySelector('.wku-pv'), 'click', function () {
      go(i - 1)
      arm()
    })
    listen(r.querySelector('.wku-nx'), 'click', function () {
      go(i + 1)
      arm()
    })
    listen(pp, 'click', function () {
      paused = !paused
      pp.textContent = paused ? '▶' : '❚❚'
      pp.setAttribute('aria-label', paused ? 'Play' : 'Pause')
      arm()
    })
    arm()
  })()

  ;(() => {
    const hl = document.querySelector('.hl')
    if (!hl) return
    const D = 6500,
      rm = matchMedia('(prefers-reduced-motion:reduce)').matches
    let k = 1,
      t,
      hov = false,
      seen = false
    const set = (n) => {
      hl.classList.remove('auto')
      if (n === k && hl.dataset.s == n) {
        hl.dataset.s = '0'
        void hl.offsetWidth
      }
      k = n
      hl.dataset.s = String(n)
      void hl.offsetWidth
      if (!hov && !rm && seen) {
        hl.classList.add('auto')
        clearTimeout(t)
        t = setTimeout(() => set((k % 3) + 1), D)
      }
    }
    hl.style.setProperty('--hd', D + 'ms')
    hl.querySelectorAll('.tr').forEach((el) => {
      const n = +el.dataset.k
      const go = () => {
        hov = true
        clearTimeout(t)
        if (n !== k || hl.classList.contains('auto')) set(n)
      }
      listen(el, 'mouseenter', go)
      listen(el, 'focus', go)
      listen(el, 'click', go)
    })
    listen(hl.querySelector('.hl-list'), 'mouseleave', () => {
      hov = false
      clearTimeout(t)
      hl.classList.remove('auto')
      void hl.offsetWidth
      hl.classList.add('auto')
      t = setTimeout(() => set((k % 3) + 1), D)
    })
    new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !seen) {
          seen = true
          set(1)
        }
      },
      { threshold: 0.35 },
    ).observe(hl)
  })()

  return () => {
    disposed = true
    lifetime.abort()
    observers.forEach((observer) => observer.disconnect())
    timeouts.forEach(window.clearTimeout)
    intervals.forEach(window.clearInterval)
    frames.forEach(window.cancelAnimationFrame)
    root
      .querySelectorAll('*')
      .forEach((el) => el.getAnimations?.().forEach((animation) => animation.cancel()))
  }
}
