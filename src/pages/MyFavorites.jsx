//My Favorites Page Component
// Displays user's favorite reviews (Challenge requirement)

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaStar, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';

const MyFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = () => {
    fetch(`${API_URL}/favorites/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to load favorites');
        setLoading(false);
      });
  };

  const handleRemoveFavorite = async (id) => {
    try {
      const response = await fetch(`${API_URL}/favorites/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Removed from favorites');
        setFavorites(favorites.filter((fav) => fav._id !== id));
      } else {
        toast.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
        <p className="text-gray-600">Your favorite food reviews</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg mb-4">
            You haven't added any favorites yet
          </p>
          <Link
            to="/all-reviews"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Explore Reviews
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={favorite.foodImage}
                  alt={favorite.foodName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
                  }}
                />
                <button
                  onClick={() => handleRemoveFavorite(favorite._id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Remove from favorites"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {favorite.foodName}
                </h3>

                <p className="text-gray-600 mb-1">
                  <strong>Restaurant:</strong> {favorite.restaurantName}
                </p>

                <p className="text-gray-600 mb-2 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {favorite.location}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < favorite.rating ? '' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-semibold">
                    {favorite.rating}/5
                  </span>
                </div>

                <Link
                  to={`/reviews/${favorite.reviewId}`}
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;