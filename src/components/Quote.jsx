import { WEALTH_QUOTES } from '../constants'

// Deterministic pick by seed (usually the step number) so the quote is stable
// across re-renders but differs from page to page.
export default function Quote({ seed = 0, className = '' }) {
  if (!WEALTH_QUOTES.length) return null

  const idx = ((Math.trunc(seed) % WEALTH_QUOTES.length) + WEALTH_QUOTES.length) % WEALTH_QUOTES.length
  const { text, author } = WEALTH_QUOTES[idx]

  return (
    <figure className={`flex items-start gap-3 max-w-2xl mx-auto text-center sm:text-left ${className}`}>
      <svg
        className="w-6 h-6 text-indigo-200 shrink-0 hidden sm:block"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm9 0A5.17 5.17 0 0011 11.17V18h6.83v-6.83H14.5a1.67 1.67 0 011.67-1.67V6z" />
      </svg>
      <div>
        <blockquote className="text-sm italic text-gray-600 leading-relaxed">“{text}”</blockquote>
        <figcaption className="text-xs font-semibold text-gray-400 mt-1">— {author}</figcaption>
      </div>
    </figure>
  )
}
