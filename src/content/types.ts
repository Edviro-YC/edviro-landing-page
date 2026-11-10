/** A parent in the breadcrumb trail: label and root-relative path. */
export type Crumb = [label: string, path: string]
/** Link text and destination (a site path, `#anchor`, `mailto:` or full URL). */
export type LinkPair = [label: string, href: string]

export type FixStatus = 'review' | 'progress' | 'dispatched' | 'verified'

export interface FixScreen {
  crumb: string
  heading: string
  count: string
  rows: { title: string; meta: string; status: FixStatus }[]
}

interface SectionBase {
  /** Anchor for links such as /modules/#utility-tracking. */
  id?: string
  /** Small green label above the heading. */
  label?: string
  title?: string
  intro?: string
}

export type Section =
  | (SectionBase & { type: 'answer'; question: string; answer: string })
  | (SectionBase & { type: 'stats'; items: [value: string, label: string][] })
  | (SectionBase & { type: 'steps'; steps: { title: string; text: string; tag?: string }[] })
  | (SectionBase & {
      type: 'cards'
      cards: { title: string; text?: string; href?: string; tag?: string }[]
    })
  | (SectionBase & {
      type: 'panels'
      panels: { tag?: string; title: string; text: string; link?: LinkPair }[]
    })
  | (SectionBase & { type: 'chips'; items: string[]; note?: string })
  | (SectionBase & { type: 'rows'; rows: [term: string, text: string][] })
  | (SectionBase & { type: 'screen'; screen: FixScreen })
  | (SectionBase & { type: 'prose'; blocks: (string | { h: string } | { list: string[] })[] })
  | (SectionBase & {
      type: 'faq'
      items?: [question: string, answer: string][]
      groups?: { title: string; items: [question: string, answer: string][] }[]
    })

export interface ContentPage {
  /** Route path without a trailing slash, e.g. `/work-orders`. */
  path: string
  title: string
  description: string
  hero: {
    crumbs?: Crumb[]
    label: string
    title: string
    lede: string
    /** Replaces the default "Book a demo" button. */
    primary?: LinkPair
    secondary?: LinkPair
    note?: string
  }
  sections: Section[]
}
