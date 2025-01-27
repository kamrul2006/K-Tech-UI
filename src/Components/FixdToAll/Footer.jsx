import React from "react";
import logo from "../../assets/llg.png";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pb-5 pt-10 px-6">
      <Fade duration={3000}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="K-Tech" className="w-12 md:w-14 bg-white rounded-se-3xl" />
              <h2 className="text-2xl md:text-3xl font-bold">K-Tech</h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base font-sans">
              Revolutionizing technology, one innovation at a time. Join us in shaping the future.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base font-sans">
              <li>
                <strong>Email:</strong> support@k-tech.com
              </li>
              <li>
                <strong>Phone:</strong> +123-456-7890
              </li>
              <li>
                <strong>Address:</strong> 123 Tech Avenue, Innovation City, 456789
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm md:text-base font-semibold">
              <li>
                <a href="/" className="hover:text-blue-400 hover:underline">Home</a>
              </li>
              <li>
                <a href="/products" className="hover:text-blue-400 hover:underline">Products</a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 hover:underline">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 hover:underline">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm md:text-base font-sans">
          <p>&copy; {new Date().getFullYear()} K-Tech. All Rights Reserved.</p>
          <p>Designed and Developed by K-Tech Team.</p>
        </div>
      </Fade>
    </footer>
  );
};

export default Footer;
