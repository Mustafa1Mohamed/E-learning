import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeAction } from '../Store/actions/ThemeAction';
import { FaMoon, FaSun } from "react-icons/fa";

import "./NavBar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState('en');
  const favorite = useSelector((state) => state.FavReducers.favorites);
  const theme = useSelector((state) => state.combineTheme.theme);
  const dispatch = useDispatch();
  const handleThemeToggle = () => {
    dispatch(ThemeAction(theme === 'Light' ? 'Dark' : 'Light'));
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [admin,serAdmin]=useState(null)
  const navigate = useNavigate();

  const handleLanguageclick = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  }

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("currentUser")));
      serAdmin(JSON.parse(localStorage.getItem("admin")));
    };
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    setUser(storedUser);
    serAdmin(storedAdmin);
    window.addEventListener("userChange", handleStorageChange);
    return () => window.removeEventListener("userChange", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("admin");
    window.dispatchEvent(new Event("userChange"));
    setUser(null);
    serAdmin(null);
    navigate("/login");
  };
  // Determine theme classes
  const navBgClass = theme === 'Dark' ? 'bg-gray-800' : 'bg-gray-100';
  const textClass = theme === 'Dark' ? 'dark:text-white' : 'text-black';
  return (
    <header dir={i18n.dir()} id="header" className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className={`flex items-center justify-between p-4 lg:px-8 ${navBgClass} shadow-md`}
      >
        {/* Logo */}
        <div className="flex lg:flex-1 cursor-pointer"><span className={`text-2xl font-bold text-indigo-600`}> {t("E-Learning")} </span></div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${textClass}`}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="hidden lg:flex lg:gap-x-12">
          <div className="hidden lg:flex lg:gap-x-12 align-content-center">
            <NavLink to="/" className={`text-sm font-semibold ${textClass}`}>
              {t("Home")}
            </NavLink>
            <NavLink to="/courses" className={`text-sm font-semibold ${textClass}`}>
              {t("Courses")}
            </NavLink>
            <NavLink to="/favourite" className={`text-sm font-semibold ${textClass}`}>
              {t("Favorites") + " "}
              <span className="text-xs text-gray-500">({favorite.length})</span>
            </NavLink>
            <NavLink to="/whishlist" className={`text-sm font-semibold ${textClass}`}>
              {t("Wishlist")}
            </NavLink>
          </div>
        </div>

        {/* Desktop Login/User + Theme Toggle */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">

          <button
            onClick={handleThemeToggle}
            className={`text-sm font-semibold px-3 py-2 rounded-lg ${textClass}`}
          >
            {theme === "Light" ? <FaMoon /> : <FaSun />}
          </button>
          {user ? (
            <>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`text-sm font-semibold ${textClass}`}
                onClick={() => navigate("/Profile")}>
                {t("Hello")}, {user.name}
              </span>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'}
                onClick={() => handleLanguageclick()}
                className={`cursor-pointer text-left rounded-lg px-3 py-2 text-base font-semibold ${textClass}`}
              >
                {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
              </span>
              <button
                onClick={handleLogout}
                className={`text-sm font-semibold text-red-600 hover:text-red-800`}
              >
                {t("Logout")}
              </button>
            </>
          ) : admin ? (
            <>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`text-sm font-semibold ${textClass}`}>
                {t("Hello")}, {admin.name}
              </span>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'}
                onClick={() => handleLanguageclick()}
                className={`cursor-pointer text-left rounded-lg px-3 py-2 text-base font-semibold ${textClass}`}
              >
                {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
              </span>
              <button
                onClick={handleLogout}
                className={`text-sm font-semibold text-red-600 hover:text-red-800`}
              >
                {t("Logout")}
              </button>
            </>
          ) : (
            <>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'}
                onClick={() => handleLanguageclick()}
                className={`cursor-pointer text-left rounded-lg px-3 py-2 text-base font-semibold ${textClass} hover:bg-gray-200`}
              >
                {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
              </span>
              <NavLink to="/login" className={`text-sm font-semibold ${textClass}`}>
                {t("Login")} <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-y-0 z-50 w-2/5 transform transition-transform duration-500 ease-in-out ${locale === 'ar'
          ? `left-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`
          : `right-0 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`
          }`}
      >
        <div className={`w-full h-full shadow-lg p-6 ${navBgClass}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {/* Header inside menu */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">
              {t('E-Learning')}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className={`-m-2.5 rounded-md p-2.5 ${textClass}`}
            >
              <span className="sr-only">Close menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="size-6"
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* NavLinks */}
          <div className="mt-6 flow-root">
            <div className={`-my-6 divide-y ${textClass}`}>
              <div className="space-y-2 py-6">
                <NavLink
                  to="/"
                  className={`block rounded-lg px-3 py-2 text-base font-semibold ${textClass} hover:bg-gray-200 hover:text-indigo-600`}
                >
                  {t("Home")}
                </NavLink>
                <NavLink
                  to="/courses"
                  className={`block rounded-lg px-3 py-2 text-base font-semibold ${textClass} hover:bg-gray-200 hover:text-indigo-600`}
                >
                  {t("Courses")}
                </NavLink>
                <NavLink
                  to="/favourite"
                  className={`block rounded-lg px-3 py-2 text-base font-semibold ${textClass} hover:bg-gray-200 hover:text-indigo-600`}
                >
                  {t("Favorites")}
                </NavLink>
                <NavLink
                  to="/whishlist"
                  className={`block rounded-lg px-3 py-2 text-base font-semibold ${textClass} hover:bg-gray-200 hover:text-indigo-600`}
                >
                  {t("Wishlist")}
                </NavLink>
              </div>
              <div className="py-6">
                <button
                  onClick={handleThemeToggle}
                  className={`w-full text-sm font-semibold px-3 py-2 rounded-lg ${textClass} hover:bg-gray-200 hover:text-indigo-600`}
                >
                  {theme === "Light" ? <FaMoon /> : <FaSun />}
                </button>
                {user ? (
                  <>
                    <span className={`block px-3 py-2 text-base font-semibold ${textClass}`}>
                      {t("Hello")}, {user.name}
                    </span>
                    <button
                      onClick={() => handleLanguageclick()}
                      className={`w-full text-start block rounded-lg px-3 py-2 text-base font-semibold ${textClass} hover:bg-gray-200 hover:text-indigo-600`}
                    >
                      {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className={`w-full block rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-200 text-start`}
                    >
                      {t("Logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleLanguageclick()}
                      className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200"
                    >
                      {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
                    </button>
                    <NavLink
                      to="/login"
                      className="block rounded-lg px-3 py-2.5 text-base font-semibold text-black hover:bg-gray-200 hover:text-indigo-600"
                    >
                      {t("Login")}
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;