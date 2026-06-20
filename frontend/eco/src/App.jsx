
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './components/home';
import AuthContainer from './components/signup';
import ForgotPassword from './components/forgot-password';
import About from './components/about';
import Contact from './components/contact';
import PrivacyPolicy from './components/privacy';
import Terms from './components/terms';
import NotFound from './components/not-found';

// Authenticated Pages
import ProtectedRoute from './components/protected-route';
import AppLayout from './components/app-layout';
import Dashboard from './components/dashboard';
import NewAnalysis from './components/new-analysis';
import Processing from './components/processing';
import AnalysisResult from './components/analysis-result';
import History from './components/history';
import ReportDetail from './components/report-detail';
import Profile from './components/profile';
import Settings from './components/settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Authenticated Routes with Sidebar Layout */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/new" element={<NewAnalysis />} />
          <Route path="/analysis/processing" element={<Processing />} />
          <Route path="/analysis/result" element={<AnalysisResult />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<ReportDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;