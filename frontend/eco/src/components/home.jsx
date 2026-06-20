import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import heat from '../assets/heat.png';
import heat1 from '../assets/heat1.webp';
import '../styles/home.css';

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = useMemo(() => [heat, heat1], []);
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-wrapper">

      {/* Shared blurred background carousel */}
      <div
        className="home-bg-underlay"
        style={{ backgroundImage: `url(${images[activeSlide]})` }}
      />

      {/* Glassmorphism overlay */}
      <div className="home-bg-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-container">
          <span className="badge">🌱 AI-Powered Green Software Engineering Platform</span>
          <h1>Write Smarter Code.<br />Build a Greener Future.</h1>
          <p>
            EcoCode Analyzer helps developers measure the sustainability of their software using IBM Granite AI.
            Analyze code quality, energy impact, and resource efficiency while receiving actionable recommendations for greener programming.
          </p>
          <div className="hero-buttons">
            <Link to={isLoggedIn ? "/analysis/new" : "/auth"} className="btn-cta large">Start Analysis</Link>
            <a href="#features" className="btn-secondary large">Learn More</a>
          </div>

          {/* Slide indicators */}
          <div className="carousel-indicators">
            {images.map((_, i) => (
              <span
                key={i}
                className={`dot ${activeSlide === i ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Code Analyses Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">85%</div>
            <div className="stat-label">Average Green Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15%</div>
            <div className="stat-label">Potential Energy Savings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">AI-Powered Insights</div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Everything you need to analyze, understand, and reduce software environmental impact.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Sustainability Analysis</h3>
            <p>Analyze code using IBM Granite AI to identify inefficiencies and sustainability risks.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Green Score Evaluation</h3>
            <p>Receive a sustainability score that reflects the environmental impact of your code.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Energy Impact Assessment</h3>
            <p>Understand how resource utilization affects energy consumption.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Optimization Recommendations</h3>
            <p>Get practical suggestions to improve efficiency and reduce computational waste.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard Analytics</h3>
            <p>Track your progress and monitor improvements over time.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🕰️</div>
            <h3>Analysis History</h3>
            <p>Access previous reports and compare sustainability scores.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Analyze your software in three simple steps.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-badge">Step 1</div>
            <h3>Paste Your Code</h3>
            <p>Submit source code in your preferred programming language.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">Step 2</div>
            <h3>AI Analysis</h3>
            <p>IBM Granite evaluates code quality, complexity, resource usage, and sustainability.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">Step 3</div>
            <h3>Get Your Report</h3>
            <p>Receive a Green Score, recommendations, and energy impact assessment.</p>
          </div>
        </div>
      </section>

      {/* Why EcoCode Section */}
      <section className="why-ecocode-section">
        <div className="why-ecocode-container">
          <h2>Why EcoCode?</h2>
          <p>
            Traditional code analyzers focus on bugs and performance.
            EcoCode Analyzer goes further by evaluating software sustainability, helping developers build energy-efficient applications that support a greener digital future.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Build Sustainable Software?</h2>
          <p>Join the movement toward Green Software Engineering.</p>
          <Link to={isLoggedIn ? "/analysis/new" : "/auth"} className="btn-cta large">Analyze Your Code</Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;