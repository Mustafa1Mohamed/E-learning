import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  const { t, i18n } = useTranslation()
  const direction = i18n.dir()
  return (
    <footer dir={direction} className="bg-gray-100 py-12 ps-8 sm:px-12 lg:px-12  mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold">
            <h2 className="text-indigo-600">{t("E-Learning")}</h2>
          </h2>
          <p className="text-gray-500 mt-4">
            {t("Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficia dese mollit anim id est laborum.")}
          </p>
          <p className="text-gray-400 mt-4 text-xs">
            {t("Copyright ©2025 All rights reserved")}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">{t("Contact Us")}</h3>
          <p className="my-2">{t("Email")}: info.deertcreative@gmail.com</p>
          <p className="my-2">{t("Phone")}: (+88) 111 555 666</p>
          <p className="mt-2">{t("Address: 40 Baria Sreet 133/2 NewYork City, USA")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">{t("Quick Links")}</h3>
          <ul className="space-y-2">
            <li>{t("About")}</li>
            <li>{t("Terms of Use")}</li>
            <li>{t("Privacy Policy")}</li>
            <li>{t("Contact Us")}</li>
            <li>{t("Documentation")}</li>
            <li>{t("Forums")}</li>
            <li>{t("Language Packs")}</li>
            <li>{t("Release Status")}</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">{t("Follow Us")}</h3>
          <div className="flex space-x-4 text-indigo-600 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer"><FaGooglePlusG /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
