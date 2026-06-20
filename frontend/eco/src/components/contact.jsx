
import Navbar from './navbar';
import Footer from './footer';
import '../styles/legal.css';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="legal-container">
        <h1>Contact Us</h1>
        <p>Have questions about AMU or sustainable engineering? We'd love to hear from you.</p>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); }}>
          <div className="input-group">
            <input type="text" placeholder="Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <textarea placeholder="Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn-cta">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
