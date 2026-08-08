// Netlify Function: Fetch live tax news from NewsAPI
// Endpoint: /.netlify/functions/get-tax-news
// Environment variable: NEWSAPI_KEY (sign up at newsapi.org, 100 free requests/day)

const NEWS_API_KEY = process.env.NEWSAPI_KEY
const NEWS_API_URL = 'https://newsapi.org/v2/everything'

// In-memory cache to avoid hitting API quota
let cache = null
let cacheTime = null
const CACHE_TTL = 6 * 60 * 60 * 1000 // 6 hours

// Fallback curated news if API fails
const FALLBACK_NEWS = [
  {
    date: '2025-07-31',
    tag: 'Deadline',
    title: 'ITR filing deadline for FY 2024-25 extended to 15 September 2025',
    summary: 'The CBDT extended the due date for non-audit taxpayers to file returns for AY 2025-26, giving salaried individuals extra time.',
  },
  {
    date: '2025-04-01',
    tag: 'Regime',
    title: 'New tax regime is now the default from FY 2025-26',
    summary: 'Unless you actively opt for the old regime, the new regime applies by default — with a ₹75,000 standard deduction and higher slab thresholds.',
  },
  {
    date: '2025-02-01',
    tag: 'Budget',
    title: 'Budget 2025: No income tax up to ₹12 lakh under the new regime',
    summary: 'The enhanced Section 87A rebate means individuals with taxable income up to ₹12,00,000 pay zero tax under the new regime (₹12.75L with standard deduction).',
  },
  {
    date: '2025-02-01',
    tag: 'Budget',
    title: 'Revised new-regime slabs announced for FY 2025-26',
    summary: 'Budget 2025 restructured the new-regime slabs, widening the 0% band and lowering effective rates for middle-income salaried taxpayers.',
  },
]

// Map NewsAPI article to our format
function transformArticle(article) {
  const published = new Date(article.publishedAt)
  const date = published.toISOString().split('T')[0] // YYYY-MM-DD

  // Categorize by keywords
  let tag = 'Update'
  const text = (article.title + ' ' + article.description).toLowerCase()
  if (text.includes('budget')) tag = 'Budget'
  else if (text.includes('regime') || text.includes('deduction')) tag = 'Regime'
  else if (text.includes('deadline') || text.includes('due date')) tag = 'Deadline'

  return {
    date,
    tag,
    title: article.title,
    summary: article.description || article.content || 'Read more on the source.',
    source: article.source.name,
  }
}

// Fetch from NewsAPI
async function fetchLiveNews() {
  // Return cached result if fresh
  if (cache && cacheTime && Date.now() - cacheTime < CACHE_TTL) {
    console.log('✓ Returning cached tax news')
    return cache
  }

  if (!NEWS_API_KEY) {
    console.warn('⚠ NEWSAPI_KEY not set; using fallback curated news')
    return FALLBACK_NEWS
  }

  try {
    console.log('📡 Fetching live tax news from NewsAPI...')
    const query = '(indian tax OR income tax OR "budget 2025") AND (india OR INR)'
    const url = new URL(NEWS_API_URL)
    url.searchParams.set('q', query)
    url.searchParams.set('sortBy', 'publishedAt')
    url.searchParams.set('language', 'en')
    url.searchParams.set('apiKey', NEWS_API_KEY)
    url.searchParams.set('pageSize', '10')

    const response = await fetch(url.toString())

    if (!response.ok) {
      if (response.status === 426) {
        console.warn('⚠ NewsAPI quota exceeded; using fallback')
        return FALLBACK_NEWS
      }
      throw new Error(`NewsAPI returned ${response.status}`)
    }

    const data = await response.json()

    if (!data.articles || data.articles.length === 0) {
      console.warn('⚠ No articles found; using fallback')
      return FALLBACK_NEWS
    }

    // Transform and take top 4
    const news = data.articles
      .map(transformArticle)
      .slice(0, 4)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    console.log(`✓ Fetched ${news.length} live articles`)

    // Cache the result
    cache = news
    cacheTime = Date.now()

    return news
  } catch (err) {
    console.error('❌ Error fetching news:', err.message)
    console.log('Falling back to curated news')
    return FALLBACK_NEWS
  }
}

// Netlify Function handler
export default async (req, context) => {
  try {
    const news = await fetchLiveNews()

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // CDN cache for 1 hour
      },
    })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(JSON.stringify(FALLBACK_NEWS), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
