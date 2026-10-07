import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import './App.css';

const Home     = lazy(() => import('./pages/Home.jsx'));
const About    = lazy(() => import('./pages/About.jsx'));
const Games    = lazy(() => import('./pages/Games.jsx'));
const Events   = lazy(() => import('./pages/Events.jsx'));
const Athletes = lazy(() => import('./pages/Athletes.jsx'));
const Gallery  = lazy(() => import('./pages/Gallery.jsx'));
const News     = lazy(() => import('./pages/News.jsx'));
const Contact  = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <div className="page-loader__spinner"></div>
      <p className="page-loader__text">Loading…</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main className="app__main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/games"    element={<Games />} />
            <Route path="/events"   element={<Events />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/gallery"  element={<Gallery />} />
            <Route path="/news"     element={<News />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}