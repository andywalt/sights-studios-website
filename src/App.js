import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
// import TestimonialsPage from './pages/TestimonialsPage';
// import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
// import FaqPage from './pages/FaqPage';
import ComingSoon from './pages/ComingSoonPage';
import ScrollToTop from './components/ScrollToTop'; // Import the ScrollToTop component


import Footer from '../src/components/HomeSections/FooterSection/footer';
import './App.css'; // Import the App.css file



function App() {
  
  return (
    <div className="app-wrapper">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          {/* <Route path="/testimonials" element={<TestimonialsPage />} /> */}
          {/* <Route path="/blog" element={<BlogPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/faq" element={<FaqPage />} /> */}
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;