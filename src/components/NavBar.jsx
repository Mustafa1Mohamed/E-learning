import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState('en');
  const favorite = useSelector((state) => state.FavReducers.favorites);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
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
    };
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
    window.addEventListener("userChange", handleStorageChange);
    return () => window.removeEventListener("userChange", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("userChange"));
    setUser(null);
    navigate("/login");
  };
  return (
    <header dir={i18n.dir()} id="header" className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8 bg-gray-100 shadow-md"
      >
        {/* Logo */}
        <div className="flex lg:flex-1 cursor-pointer"><span className="text-2xl font-bold text-indigo-600"> {t("E-Learning")} </span></div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
          <NavLink to="/" className="text-sm font-semibold text-black">
            {t("Home")}
          </NavLink>
          <NavLink to="/courses" className="text-sm font-semibold text-black">
            {t("Courses")}
          </NavLink>
          <NavLink to="/favourite" className="text-sm font-semibold text-black">
            {t("Favorites")}{" "}
            <span className="text-xs text-gray-500">({favorite.length})</span>
          </NavLink>
          <NavLink to="/whishlist" className="text-sm font-semibold text-black">
            {t("Wishlist")}
          </NavLink>
        </div>

        {/* Desktop Login/User */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          {user ? (
            <>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'} className="text-sm font-semibold text-black">
                {t("Hello")}, {user.name}
              </span>
              <span dir={locale === 'ar' ? 'rtl' : 'ltr'}
                onClick={() => handleLanguageclick()}
                className=" text-left rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200"
              >
                {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                {t("Logout")}
              </button>
            </>
          ) : (
            <NavLink to="/login" className="text-sm font-semibold text-black">
              {t("login")} <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-0 z-50 flex justify-end transform transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="w-2/5 h-full bg-gray-100 shadow-lg p-6">
          {/* Header inside menu */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">
              E-Learning
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200 hover:text-indigo-600"
                >
                  {t("Home")}
                </NavLink>
                <NavLink
                  to="/courses"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200 hover:text-indigo-600"
                >
                  {t("Courses")}
                </NavLink>
                <NavLink
                  to="/favourite"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200 hover:text-indigo-600"
                >
                  {t("Favorites")}
                </NavLink>
                <NavLink
                  to="/whishlist"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200 hover:text-indigo-600"
                >
                  {t("Wishlist")}
                </NavLink>
              </div>
              <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="py-6">
                {user ? (
                  <>
                    <span className="block px-3 py-2 text-base font-semibold text-black">
                      {t("Hello")}, {user.name}
                    </span>
                    <button
                      onClick={() => handleLanguageclick()}
                      className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-black hover:bg-gray-200"
                    >
                      {locale === 'en' ? 'Arabic' : 'الإنجليزية'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-200"
                    >
                      {t("Logout")}
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-black hover:bg-gray-200 hover:text-indigo-600"
                  >
                    {t("Login")}
                  </NavLink>
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
