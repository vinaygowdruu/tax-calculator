# Live Tax News Setup (5 Minutes)

## What's New

Your tax calculator now has a **Netlify Function** that fetches **live tax news** from NewsAPI every time someone visits. If the API is unavailable, it gracefully falls back to curated static news.

## Setup (Choose One)

### 🚀 Fastest: GitHub → Netlify Connect

1. Push this repo to GitHub
2. Go to **https://app.netlify.com** → "New site from Git"
3. Select your repo, deploy
4. In Netlify dashboard: **Site Settings** → **Environment variables**
5. Add: `NEWSAPI_KEY` = (your key from https://newsapi.org)
6. Trigger new deploy

**Time:** 3 minutes | **Cost:** $0

---

### 🏠 Local Testing: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Get free API key at https://newsapi.org

# 3. Create .env.local (will be ignored by git)
echo "NEWSAPI_KEY=your_key_here" > .env.local

# 4. Start dev server with functions
netlify dev

# 5. Visit http://localhost:8888
```

**Time:** 5 minutes | **Cost:** $0

---

## Files Added

| File | Purpose |
|------|---------|
| `netlify.toml` | Netlify config (build, functions dir, publish dir) |
| `netlify/functions/get-tax-news.js` | Serverless function to fetch news from NewsAPI |
| `src/components/TaxNews.jsx` | Updated to fetch from function + fallback |
| `.env.example` | Template for environment variable |
| `NETLIFY_SETUP.md` | Detailed deployment guide |

---

## How It Works

```
User visits → TaxNews component loads
  ↓
Tries: fetch('/.netlify/functions/get-tax-news')
  ↓
✅ If OK: Shows live news, caches in localStorage
❌ If fails: Falls back to static news from constants.js
  ↓
Caches results for 6 hours to avoid API quota overages
```

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Netlify Functions | 125,000 invocations/month | $0 |
| NewsAPI | 100 requests/day | $0 |
| **Total** | | **$0/month** |

---

## Verification

After deployment, check your site:
- Look for "Latest tax news" section on home page
- If badge says "🔄 Live news" → Success ✅
- If badge says "📌 Curated highlights" → Using fallback (still works, just not live) ⚠️

---

## Troubleshooting

**Live news not showing?**
- Check Netlify Functions logs in dashboard
- Verify `NEWSAPI_KEY` is set in environment variables
- Ensure at least one deploy after adding the key

**Want to use static-only news?**
- Delete the `useEffect` from `src/components/TaxNews.jsx`
- Function still runs but won't be called

**Quota exceeded?**
- App automatically falls back to static news
- Quota resets daily (100 requests = plenty for this use case)

---

## Next Steps

1. Sign up for free NewsAPI key: https://newsapi.org
2. Choose deployment method (GitHub → Netlify or Netlify CLI)
3. Set `NEWSAPI_KEY` environment variable
4. Deploy and watch the magic happen ✨
