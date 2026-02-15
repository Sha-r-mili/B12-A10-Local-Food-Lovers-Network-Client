//404 Not Found Page Component
// Displays when user navigates to invalid route

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500"
            alt="404 Food Not Found"
            className="mx-auto w-64 h-64 object-cover rounded-full shadow-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300?text=404';
            }}
          />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this page got eaten! The page you're looking for doesn't exist
          or has been moved to another location.
        </p>
        
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;