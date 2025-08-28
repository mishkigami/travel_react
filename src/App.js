import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import TourSelection from './pages/TourSelection/TourSelection';

import Login from './pages/Login/Login';
import GlobalStyles from './styles/GlobalStyles';
import AdminTourOffers from './pages/Admin/TourOffers';
import AdminTourShow from './pages/Admin/TourOffers/Show';
import NewTourOffer from './pages/Admin/TourOffers/New';
import AdminBookings from './pages/Admin/Bookings';
import AllDestinations from './pages/AllDestinations/AllDestinations';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/tour-selection" element={<TourSelection />} />

          <Route path="/login" element={<Login />} />
        </Route>
        
        <Route path="/admin/tour-offers" element={<AdminTourOffers />} />
        <Route path="/admin/tour-offers/:id" element={<AdminTourShow />} />
        <Route path="/admin/tour-offers/new" element={<NewTourOffer />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/destinations" element={<AllDestinations />} />
      </Routes>
    </Router>
  );
}

export default App;