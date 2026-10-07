import React, { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import NewsCard from '../components/NewsCard.jsx';
import { newsData, newsCategories } from '../data/news.js';
import './News.css';

const ITEMS_PER_PAGE = 6;

export default function News() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    return newsData.filter((n) => {
      const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                            n.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || n.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => setVisibleCount((c) => c + ITEMS_PER_PAGE);

  return (
    <div className="news">
      <section className="page-header">
        <h1 className="page-header__title">News &amp; Updates</h1>
        <p className="page-header__subtitle">
          Stay up to date with the latest announcements, stories, and achievements from IGS.
        </p>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Newsroom"
          title="Latest"
          highlight="Stories"
          subtitle="Explore news, announcements, and highlights from across our federation."
        />

        <div className="news__controls">
          <div className="news__search">
            <span className="news__search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search news…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              aria-label="Search news"
            />
          </div>
          <div className="news__filters" role="tablist" aria-label="Filter news by category">
            {newsCategories.map((c) => (
              <button
                key={c}
                className={`news__filter ${category === c ? 'news__filter--active' : ''}`}
                onClick={() => { setCategory(c); setVisibleCount(ITEMS_PER_PAGE); }}
                role="tab"
                aria-selected={category === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="news__grid">
          {visible.map((item) => <NewsCard key={item.id} item={item} />)}
        </div>

        {visible.length === 0 && <p className="news__empty">No news articles match your search.</p>}

        {hasMore && (
          <div className="news__load-more">
            <button className="news__load-btn" onClick={handleLoadMore}>
              Load More Articles
            </button>
          </div>
        )}
      </section>
    </div>
  );
}