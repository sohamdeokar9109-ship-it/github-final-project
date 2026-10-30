import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">Rooted in good things</p>
          <h1>A greener home<br />starts <em>with us.</em></h1>
          <p>Paradise Nursery is here to make the joy of living with plants welcoming, uncomplicated, and part of everyday life.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85" alt="Sunlight falling across lush green leaves" />
      </section>
      <section className="about-story content-width">
        <p className="eyebrow">A little about us</p>
        <h2>Plants make a place<br />feel like <em>your place.</em></h2>
        <p className="story-copy">
          We believe plants do more than decorate a room. They invite us to slow down,
          care for something, and notice the small changes that make a house a home.
          Paradise Nursery brings together lovely, dependable houseplants and practical
          guidance, so everyone can find their own way to grow.
        </p>
      </section>
      <section className="mission-grid">
        <article><span className="section-number">01 / OUR MISSION</span><h3>Make plant care feel possible.</h3><p>We help people find plants that fit their space, their light, and their lives—with clear advice at every step.</p></article>
        <article><span className="section-number">02 / OUR VISION</span><h3>A little more nature, everywhere.</h3><p>We imagine homes and communities made healthier and happier by a closer, more thoughtful relationship with nature.</p></article>
        <article><span className="section-number">03 / OUR PROMISE</span><h3>Good plants. Good guidance.</h3><p>Every plant in our collection is chosen to help you enjoy the experience of growing, one leaf at a time.</p></article>
      </section>
      <div className="about-cta">
        <p>Ready to find your new favorite?</p>
        <Link className="button button-dark" to="/plants">Explore the plants <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
