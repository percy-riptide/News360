import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ChangePassword from '../Webpages/ChangePassword';
import ProfilePage from '../Webpages/ProfilePage';
import LandingPage from '../Webpages/LandingPage';
import RegistrationPage from '../Webpages/RegistrationPage';
import LoginPage from '../Webpages/LoginPage';
import NotFound from '../Webpages/NotFound';
import NewsFeed from '../Webpages/NewsFeed';
import AboutUs from '../Webpages/AboutUs';
import FAQ from '../Webpages/FAQ';
import ContactUs from '../Webpages/ContactUs';
import Preferences from '../Webpages/Preferences';
import ArticleView from '../Webpages/ArticleView';
import ForgotPassword from '../Webpages/ForgotPassword';
import Otp from '../Webpages/Otp';
import ForgotPasswordChange from '../Webpages/ForgotPasswordChange';
import ProtectedRoute from '../Webpages/ProtectedRoute';
import SavedArticlesList from './SavedArticlesList';

function AnimatedRoutes() {
    const location = useLocation();
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
      <Route path="/changepass" element={<ChangePassword />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/signup" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/feed" element={<NewsFeed />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/article/:id" element={<ArticleView/>}/>
      <Route path="/preferences" element={<Preferences/>}/> 
      <Route path="/forgotpassword" element={<ForgotPassword/>}/> 
      <Route path="otp" element={<Otp/>} />
      <Route path="/changeforgottenpassword" element={<ForgotPasswordChange />}  />
      <Route path="/savedArticles" element={<SavedArticlesList/>} />
      <Route path="/about" element={<AboutUs/>} />
    </Routes>
  </AnimatePresence>
  );
}

export default AnimatedRoutes;