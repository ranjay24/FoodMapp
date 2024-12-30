import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="bg-orange-600 py-10">
        <div className="font-serif container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <span className="text-3xl text-white font-extrabold tracking-wide">
            FoodMap.com
          </span>
          <div className="flex gap-8 text-white font-medium text-lg">
            <span className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    
      <div className="py-6 bg-gray-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p className="text-center md:text-left mb-4 md:mb-0">
              &copy; 2024 FoodMap. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-400 transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-blue-300 transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gradient bg-gradient-to-r from-pink-800 via-purple-500 to-yellow-500 hover:opacity-80 transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
