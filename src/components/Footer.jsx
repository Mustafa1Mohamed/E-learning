import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();

  // Get theme from Redux
  const theme = useSelector((state) => state.combineTheme.theme);
  const themeBg = theme === "Dark" ? "bg-gray-800" : "bg-gray-100";
  const themeText = theme === "Dark" ? "text-gray-300" : "text-gray-500";
  const headingText = theme === "Dark" ? "text-white" : "text-gray-900";

  return (
    <footer
      dir={direction}
      className={`${themeBg} py-12 ps-8 sm:px-12 lg:px-12 mt-16`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        
        {/* Logo & About */}
        <div>
          <h2 className={`text-xl font-bold ${headingText}`}>
            <span className="text-indigo-600">{t("E-Learning")}</span>
          </h2>
          <p className={`${themeText} mt-4`}>
            {t(
              "Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficia dese mollit anim id est laborum."
            )}
          </p>
          <p className="text-gray-400 mt-4 text-xs">
            {t("Copyright ©2025 All rights reserved")}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className={`font-semibold mb-4 ${headingText}`}>
            {t("Contact Us")}
          </h3>
          <p className={`my-2 ${themeText}`}>
            {t("Email")}: info.deertcreative@gmail.com
          </p>
          <p className={`my-2 ${themeText}`}>
            {t("Phone")}: (+88) 111 555 666
          </p>
          <p className={`${themeText} mt-2`}>
            {t("Address: 40 Baria Sreet 133/2 NewYork City, USA")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`font-semibold mb-4 ${headingText}`}>
            {t("Quick Links")}
          </h3>
          <ul className="space-y-2">
            <li className={themeText}>{t("About")}</li>
            <li className={themeText}>{t("Terms of Use")}</li>
            <li className={themeText}>{t("Privacy Policy")}</li>
            <li className={themeText}>{t("Contact Us")}</li>
            <li className={themeText}>{t("Documentation")}</li>
            <li className={themeText}>{t("Forums")}</li>
            <li className={themeText}>{t("Language Packs")}</li>
            <li className={themeText}>{t("Release Status")}</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className={`font-semibold mb-4 ${headingText}`}>
            {t("Follow Us")}
          </h3>
          <div className="flex space-x-4 text-indigo-600 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://plus.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGooglePlusG />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
