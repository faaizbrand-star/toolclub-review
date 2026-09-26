import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PurchaseFloatingButton } from './components/PurchaseFloatingButton';
import { HomePage } from './pages/HomePage';
import { ProofPage } from './pages/ProofPage';
import { UploadPage } from './pages/UploadPage';

type RouteState =
  | { type: 'home' }
  | { type: 'proof'; customerId: string }
  | { type: 'upload' };

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute());

  function parseRoute(): RouteState {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);

    // Check admin / upload route
    if (
      path === '/upload' ||
      path === '/upload/' ||
      path === '/admin' ||
      path === '/admin/' ||
      hash.startsWith('#/upload') ||
      hash.startsWith('#upload') ||
      hash.startsWith('#/admin') ||
      hash.startsWith('#admin') ||
      urlParams.get('admin') !== null ||
      urlParams.get('upload') !== null
    ) {
      return { type: 'upload' };
    }

    // Check hash-based routing fallback (e.g. #/proof/TC-1025)
    if (hash.startsWith('#/proof/')) {
      const id = hash.replace('#/proof/', '').trim();
      if (id) return { type: 'proof', customerId: decodeURIComponent(id) };
    }

    // Check standard pathname
    if (path.startsWith('/proof/')) {
      const id = path.replace('/proof/', '').trim();
      if (id) return { type: 'proof', customerId: decodeURIComponent(id) };
    }

    // Check query param fallback (?proof=TC-1025)
    const proofParam = urlParams.get('proof') || urlParams.get('id');
    if (proofParam) {
      return { type: 'proof', customerId: proofParam.trim() };
    }

    return { type: 'home' };
  }

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (url: string) => {
    window.history.pushState(null, '', url);
    setRoute(parseRoute());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    navigateTo('/');
  };

  const handleNavigateToProof = (customerId: string) => {
    navigateTo(`/proof/${encodeURIComponent(customerId)}`);
  };

  const handleNavigateToAdmin = () => {
    navigateTo('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Navbar onNavigateHome={handleNavigateHome} />

      <main className="flex-1">
        {route.type === 'home' && (
          <HomePage onNavigateToProof={handleNavigateToProof} />
        )}

        {route.type === 'proof' && (
          <ProofPage
            customerId={route.customerId}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {route.type === 'upload' && (
          <UploadPage onNavigateHome={handleNavigateHome} />
        )}
      </main>

      <PurchaseFloatingButton />

      <Footer onNavigateHome={handleNavigateHome} onNavigateAdmin={handleNavigateToAdmin} />
    </div>
  );
}

