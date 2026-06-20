
import Navbar from './navbar';
import Footer from './footer';
import '../styles/legal.css';

const Terms = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="legal-container">
        <h1>Terms & Conditions</h1>
        <p>Last updated: June 2026</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using AMU, you agree to be bound by these Terms & Conditions and our Privacy Policy.</p>
        <h2>2. Use of Service</h2>
        <p>You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
        <h2>3. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are owned by AMU Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
