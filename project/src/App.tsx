import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const QuestionnairePage = lazy(() => import('./pages/QuestionnairePage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const AssessmentDetailPage = lazy(() => import('./pages/AssessmentDetailPage'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="large" /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/assessment/:id" element={<AssessmentDetailPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;