
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-movie-darker py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MovieFlix</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/devices" className="hover:text-white">Supported Devices</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-white">Cookies</Link></li>
              <li><Link to="/corporate" className="hover:text-white">Corporate Information</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MovieFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
