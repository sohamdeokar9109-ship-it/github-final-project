import { useSelector } from "react-redux";
import { Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { selectCartItemCount } from "./CartSlice.jsx";
import AboutUs from "./AboutUs.jsx";
import CartItem from "./CartItem.jsx";
import ProductList from "./ProductList.jsx";

function CartIcon() {
  return (
    <svg aria-hidden="true" className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function Navbar() {
  const itemCount = useSelector(selectCartItemCount);
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Paradise Nursery home">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span>paradise<span className="brand-light">nursery</span></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink className={linkClass} to="/" end>Home</NavLink>
        <NavLink className={linkClass} to="/plants">Plants</NavLink>
        <NavLink className={linkClass} to="/about">About</NavLink>
        <NavLink className={({ isActive }) => `${linkClass({ isActive })} cart-link`} to="/cart" aria-label={`Cart, ${itemCount} items`}>
          <CartIcon />
          <span className="cart-label">Cart</span>
          <span className="cart-count" aria-live="polite">{itemCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">A little more green, every day</p>
          <h1>Make room<br />for <em>nature.</em></h1>
          <p className="hero-copy">
            Thoughtfully chosen plants to make your home feel a little more alive.
            Find your new favorite green companion.
          </p>
          <Link className="button button-light" to="/plants">Get Started <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-caption"><span>GROW SLOW. LIVE WELL.</span><span>01 — 03</span></div>
      </section>
      <section className="home-intro content-width">
        <div>
          <p className="eyebrow">Welcome to Paradise Nursery</p>
          <h2>Bring the outside<br />a little closer.</h2>
        </div>
        <p>From your first easy-care plant to the statement piece your space has been waiting for, we make finding the right plant feel simple.</p>
        <Link className="text-link" to="/about">Get to know us <span aria-hidden="true">→</span></Link>
      </section>
      <section className="promise-strip">
        <div><span className="promise-icon">✿</span><span>Plants picked with care</span></div>
        <div><span className="promise-icon">☼</span><span>Friendly growing advice</span></div>
        <div><span className="promise-icon">♡</span><span>A greener home, made easy</span></div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer">
        <Link className="footer-brand" to="/">paradise nursery</Link>
        <span>Good things grow here.</span>
        <span>© {new Date().getFullYear()} Paradise Nursery</span>
      </footer>
    </>
  );
}
