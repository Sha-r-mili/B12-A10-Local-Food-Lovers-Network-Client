import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const ReviewCard = ({ review, onFavoriteToggle }) => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(false);

  // Check if this review is already favorited
  useEffect(() => {
    if (user && review._id) {
      setCheckingFavorite(true);
      fetch(`${API_URL}/favorites/check/${user.email}/${review._id}`)
        .then((res) => res.json())
        .then((data) => {
          setIsFavorite(data.isFavorite);
          setCheckingFavorite(false);
        })
        .catch((error) => {
          console.error('Error checking favorite:', error);
          setCheckingFavorite(false);
        });
    }
  }, [user, review._id, API_URL]);

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        // This will be handled in MyFavorites page
        toast('Please remove from My Favorites page', { icon: 'ℹ️' });
        return;
      }

      // Add to favorites
      const favoriteData = {
        userEmail: user.email,
        reviewId: review._id,
        foodName: review.foodName,
        foodImage: review.foodImage,
        restaurantName: review.restaurantName,
        location: review.location,
        rating: review.rating,
      };

      const response = await fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFavorite(true);
        toast.success('Added to favorites!');
        if (onFavoriteToggle) onFavoriteToggle();
      } else {
        toast.error(data.message || 'Failed to add favorite');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={review.foodImage}
          alt={review.foodName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
          }}
        />
        {user && !checkingFavorite && (
          <button
            onClick={handleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? 'bg-red-500' : 'bg-white'
            } hover:scale-110 transition-transform`}
            title={isFavorite ? 'Added to favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaHeart className="text-white" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {review.foodName}
        </h3>

        <p className="text-gray-600 mb-1">
          <strong>Restaurant:</strong> {review.restaurantName}
        </p>

        <p className="text-gray-600 mb-2 flex items-center gap-1">
          <FaMapMarkerAlt className="text-orange-500" />
          {review.location}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < review.rating ? '' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-gray-600 font-semibold">{review.rating}/5</span>
        </div>

        {review.userName && (
          <div className="flex items-center gap-2 mb-3">
            <img
              src={review.userPhoto || 'https://via.placeholder.com/40'}
              alt={review.userName}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40';
              }}
            />
            <span className="text-sm text-gray-600">{review.userName}</span>
          </div>
        )}

        <Link
          to={`/reviews/${review._id}`}
          className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;