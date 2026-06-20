import Navbar from './navbar';
import Footer from './footer';
import '../styles/legal.css';

const About = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="legal-container">
        <h1>About EcoCode Analyzer</h1>
        <p>
          EcoCode Analyzer is an AI-powered platform designed to promote Green Software Engineering practices.
          By combining artificial intelligence with software sustainability principles, the platform helps developers
          understand how coding decisions impact resource consumption, energy usage, and environmental sustainability.
        </p>
        <p>
          Using IBM Granite, EcoCode Analyzer evaluates code quality, computational efficiency, and energy
          implications while providing actionable recommendations for improvement.
        </p>
        <h2>Mission</h2>
        <p>To empower developers to create sustainable, energy-efficient software through intelligent AI-driven insights.</p>
        <h2>Vision</h2>
        <p>A future where every software application is designed with sustainability and environmental responsibility in mind.</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;

