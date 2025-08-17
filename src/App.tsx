import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/Services/Services';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ContactPage from './pages/ContactPage/ContactPage';
import NotFound from './pages/NotFoundPage/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;