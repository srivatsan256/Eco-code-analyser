
import Navbar from './navbar';
import Footer from './footer';
import '../styles/legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="legal-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, submit code for analysis, or contact us for support.</p>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.</p>
        <h2>3. Data Security</h2>
        <p>Your codebase remains yours. Our analysis runs in isolated environments and code is never stored persistently without your explicit consent.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
