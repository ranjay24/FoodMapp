const Footer = () => {
  return (
    <footer className="bg-gray-800 text-center text-gray-300 py-8 px-4">
      <div className="bg-orange-500 py-10">
        <div className="font-serif container px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Site Name */}
          <span className="text-3xl text-white font-extrabold tracking-tight">
            FoodMap.com
          </span>

          {/* Privacy and Terms Section */}
          <div className="flex gap-6 text-white font-semibold text-lg">
            <span className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-300 transition duration-300 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>

        {/* Optional: Add a line for separation */}
        <div className="mt-6 border-t border-white opacity-30"></div>

        {/* Additional Footer Text (optional) */}
        <div className="mt-6 text-center text-white text-sm">
          <p>&copy; 2024 FoodMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
