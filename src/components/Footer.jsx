//Footer Component
// Displays site links and social media icons

import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍕</span>
              <span className="text-xl font-bold">Local Food Lovers</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting food enthusiasts who love exploring local restaurants,
              street food, and home-cooked meals. Share your experiences and
              discover great food near you!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-reviews"
                  className="text-gray-400 hover:text-orange-500"
                >
                  All Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/add-review"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Add Review
                </Link>
              </li>
              <li>
                <Link
                  to="/my-reviews"
                  className="text-gray-400 hover:text-orange-500"
                >
                  My Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 text-2xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 text-2xl"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Join our community of food lovers and share your culinary
              adventures!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Local Food Lovers Network. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;