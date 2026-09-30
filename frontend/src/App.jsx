import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUsPage from './pages/AboutUsPage';
import OurStoryPage from './pages/OurStoryPage';
import MissionVisionPage from './pages/MissionVisionPage';
import CoreValuesPage from './pages/CoreValuesPage';
import TargetMarketPage from './pages/TargetMarketPage';
import ContactPage from './pages/ContactPage';
import JobsPage from './pages/JobsPage';
import JobSinglePage from './pages/JobSinglePage';
import InsightsPage from './pages/InsightsPage';
import ServicesPage from './pages/ServicesPage';
import ManpowerPage from './pages/ManpowerPage';
import RPOPage from './pages/RPOPage';
import EORPage from './pages/EORPage';
import SolutionsPage from './pages/SolutionsPage';
import LogisticsPage from './pages/LogisticsPage';
import IndustryGenericPage from './pages/IndustryGenericPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/mission-vision" element={<MissionVisionPage />} />
        <Route path="/core-values" element={<CoreValuesPage />} />
        <Route path="/target-market" element={<TargetMarketPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobSinglePage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/manpower-outsourcing" element={<ManpowerPage />} />
        <Route path="/recruitment-process-outsourcing" element={<RPOPage />} />
        <Route path="/employer-of-record" element={<EORPage />} />
        <Route path="/specialized-technical-roles" element={<EORPage />} />
        <Route path="/compare-solutions" element={<SolutionsPage />} />

        {/* Admin Portal Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Industries Routes */}
        <Route path="/industries/logistics-supply-chain" element={<LogisticsPage />} />
        <Route path="/logistics-supply-chain" element={<LogisticsPage />} />
        <Route path="/industries/manufacturing" element={<IndustryGenericPage slug="manufacturing" />} />
        <Route path="/manufacturing" element={<IndustryGenericPage slug="manufacturing" />} />
        <Route path="/industries/retail-fmcg" element={<IndustryGenericPage slug="retail-fmcg" />} />
        <Route path="/retail-fmcg" element={<IndustryGenericPage slug="retail-fmcg" />} />
        <Route path="/industries/hospitality-food-beverage" element={<IndustryGenericPage slug="hospitality-food-beverage" />} />
        <Route path="/hospitality-food-beverage" element={<IndustryGenericPage slug="hospitality-food-beverage" />} />
        <Route path="/industries/construction-engineering" element={<IndustryGenericPage slug="construction-engineering" />} />
        <Route path="/construction-engineering" element={<IndustryGenericPage slug="construction-engineering" />} />
        <Route path="/industries/e-commerce" element={<IndustryGenericPage slug="e-commerce" />} />
        <Route path="/e-commerce" element={<IndustryGenericPage slug="e-commerce" />} />
        <Route path="/industries/financial-services-fintech" element={<IndustryGenericPage slug="financial-services-fintech" />} />
        <Route path="/financial-services-fintech" element={<IndustryGenericPage slug="financial-services-fintech" />} />
        <Route path="/industries/technology-digital" element={<IndustryGenericPage slug="technology-digital" />} />
        <Route path="/technology-digital" element={<IndustryGenericPage slug="technology-digital" />} />
        <Route path="/industries/:slug" element={<IndustryGenericPage />} />
      </Routes>
    </Router>
  );
}

export default App;