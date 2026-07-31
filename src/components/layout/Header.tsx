import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./logo.jpg";

interface NavItem {
  label: string;
  to: string;
}

interface Category {
  _id: string;
  name: string;
  slug?: string;
}

const HOME_ITEM: NavItem = { label: "Home", to: "/" };
const PRIMARY_LIMIT = 10; // how many categories show in the horizontal bar before overflowing into the offcanvas

function useTodayLabel(): string {
  const [label, setLabel] = useState("");
  useEffect(() => {
    setLabel(
      new Date().toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    );
  }, []);
  return label;
}

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const BASE = import.meta.env.VITE_BASE_URL;

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE}/db/categories`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        const list: Category[] = Array.isArray(data) ? data : data.categories || [];
        setCategories(list);
      } catch (err) {
        console.error("Failed to fetch categories for nav:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const searchInputRef              = useRef<HTMLInputElement>(null);
  const today                       = useTodayLabel();
  const { categories, loading, error } = useCategories();

  const categoryNavItems: NavItem[] = categories.map((c) => ({
    label: c.name,
    to: `/category/${c.slug || c._id}`,
  }));

  const primaryNav: NavItem[] = [HOME_ITEM, ...categoryNavItems.slice(0, PRIMARY_LIMIT)];
  const secondaryNav: NavItem[] = categoryNavItems.slice(PRIMARY_LIMIT);

  // Sticky header shadow after scrolling, like Punch's .fixed-header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the offcanvas menu or search modal is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    if (!q) return;
    setSearchOpen(false);
    window.location.href = `/?s=${encodeURIComponent(q.toString())}`;
  };

  return (
    <>
      {/* ── Top utility bar ── */}
      <section className="top-panel">
        <div className="container top-panel__inner">
          <ul>
            <li><Link to="/advertise">Advertise with us</Link></li>
            <li>{today}</li>
          </ul>
        </div>
      </section>

      {/* ── Fixed brand header + nav ── */}
      <div className={`fixed-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container brand-row">

          {/* Social icons (left) */}
          <div className="social-buttons">
            <ul>
              <li><a href="https://twitter.com/nationaldailynewspaper" target="_blank" rel="noreferrer" aria-label="X">𝕏</a></li>
              <li><a href="https://instagram.com/nationaldailynewspaper" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a></li>
              <li><a href="https://facebook.com/nationaldailynewspaper" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a></li>
            </ul>
            <button
              className="icon-btn search-toggle"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              🔍
            </button>
          </div>

          {/* Logo (center) */}
          <div className="brand">
            <Link to="/" aria-label="Homepage">
              <img src={logo} alt="The Daily Herald" className="brand__logo" />
            </Link>
            <p className="brand__tagline">Most Widely Read Newspaper</p>
          </div>

          {/* CTAs (right) */}
          <div className="header-cta">
            <button
              className="icon-btn search-toggle mobile-only"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              🔍
            </button>

            <a className="subscribe-btn" href="/epaper" target="_blank" rel="noreferrer">
              Subscribe: E-Paper
            </a>

            <button
              className="menu-toggler"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* ── Category nav bar ── */}
        <div className="navigation-wrapper">
          <nav className="navbar">
            <div className="container navbar__inner">
              <ul className="navbar-nav">
                {loading ? (
                  <li className="navbar-nav__status">Loading…</li>
                ) : error ? (
                  <li className="navbar-nav__status navbar-nav__status--error">
                    Couldn't load categories
                  </li>
                ) : (
                  primaryNav.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) => (isActive ? "is-active" : undefined)}
                        end={item.to === "/"}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))
                )}
                <li className="menu-toggler-inline">
                  <button aria-label="More categories" onClick={() => setMenuOpen(true)}>☰</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* ── Search overlay ── */}
      {searchOpen && (
        <div className="search-modal" onClick={() => setSearchOpen(false)}>
          <button
            className="search-modal__close"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            ×
          </button>
          <form
            className="search-modal__form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSearchSubmit}
          >
            <input
              ref={searchInputRef}
              name="q"
              type="search"
              placeholder="Search the paper…"
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}

      {/* ── Offcanvas mobile / "more categories" menu ── */}
      <div
        className={`offcanvas-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`offcanvas${menuOpen ? " is-open" : ""}`} role="dialog" aria-modal="true">
        <div className="offcanvas-header">
          <h2>Menu</h2>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>
        <div className="offcanvas-body">
          {loading ? (
            <p className="offcanvas-status">Loading…</p>
          ) : error ? (
            <p className="offcanvas-status offcanvas-status--error">
              Couldn't load menu. Please refresh.
            </p>
          ) : (
            <ul>
              {[...primaryNav, ...secondaryNav].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}