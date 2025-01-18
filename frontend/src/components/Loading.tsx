const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-200 to-orange-400 relative">
      {/* Spinning Plate */}
      <div className="relative flex items-center justify-center w-36 h-36 bg-white rounded-full border-8 border-yellow-500 shadow-lg animate-spin-slow">
        <div className="absolute top-0 w-8 h-8 bg-red-500 rounded-full animate-bounce-left"></div>
        <div className="absolute right-0 w-8 h-8 bg-green-500 rounded-full animate-bounce-right"></div>
        <div className="absolute bottom-0 w-8 h-8 bg-yellow-600 rounded-full animate-bounce-left"></div>
        <div className="absolute left-0 w-8 h-8 bg-blue-400 rounded-full animate-bounce-right"></div>
      </div>

      {/* Text */}
      <p className="absolute bottom-16 text-white text-2xl font-bold animate-pulse">
        Preparing Your Order...
      </p>
    </div>
  );
};

export default Loading;
