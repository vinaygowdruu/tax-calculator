import { useEffect, useState } from 'react'
import { TAX_NEWS } from '../constants'

const TAG_STYLES = {
  Budget:   'text-indigo-700 bg-indigo-50 border-indigo-100',
  Regime:   'text-green-700 bg-green-50 border-green-100',
  Deadline: 'text-amber-700 bg-amber-50 border-amber-100',
  Update:   'text-gray-700 bg-gray-100 border-gray-200',
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function TaxNews() {
  const [news, setNews] = useState(TAX_NEWS)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Try to fetch from Netlify Function
        const res = await fetch('/.netlify/functions/get-tax-news', {
          signal: AbortSignal.timeout(5000), // 5s timeout
        })

        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setNews(data)
            setIsLive(true)
            // Cache in localStorage for offline access
            localStorage.setItem('taxNews', JSON.stringify(data))
          }
        }
      } catch (err) {
        console.log('Live news unavailable; using cached/fallback data:', err.message)
        // Try to restore from localStorage
        const cached = localStorage.getItem('taxNews')
        if (cached) {
          try {
            setNews(JSON.parse(cached))
            setIsLive(true)
          } catch {
            // Fall back to static data (already set in state)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (!news.length) return null

  return (
    <section className="mt-16 lg:mt-20">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-indigo-500 tracking-widest uppercase mb-2">Stay informed</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest tax news</h2>
        <p className="text-sm text-gray-500 mt-2">Recent updates on Indian income-tax rules that may affect you.</p>
        {!loading && isLive && (
          <p className="text-xs text-green-600 mt-1">🔄 Live news · Updated daily</p>
        )}
        {!loading && !isLive && (
          <p className="text-xs text-amber-600 mt-1">📌 Curated highlights</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {news.map(({ date, tag, title, summary }) => (
          <article
            key={title}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-semibold rounded-full px-2.5 py-1 border ${TAG_STYLES[tag] || TAG_STYLES.Update}`}
              >
                {tag}
              </span>
              <time dateTime={date} className="text-xs text-gray-400">{formatDate(date)}</time>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">{title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{summary}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 text-xs text-center text-gray-400">
        {isLive ? 'Live updates from news sources · ' : 'Curated highlights · '}
        Not exhaustive · Always verify with the Income Tax Department.
      </p>
    </section>
  )
}
