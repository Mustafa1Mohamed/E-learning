import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 ps-8 sm:px-12 lg:px-12  mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold">
            <h2 className="text-indigo-600">E-learning</h2>
          </h2>
          <p className="text-gray-500 mt-4">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia dese mollit anim id est laborum.
          </p>
          <p className="text-gray-400 mt-4 text-xs">
            Copyright ©2025 All rights reserved
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="my-2">Email: info.deertcreative@gmail.com</p>
          <p className="my-2">Phone: (+88) 111 555 666</p>
          <p className="mt-2">Address: 40 Baria Sreet 133/2 NewYork City, US</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
            <li>Documentation</li>
            <li>Forums</li>
            <li>Language Packs</li>
            <li>Release Status</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-indigo-600 text-lg">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaGooglePlusG /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
