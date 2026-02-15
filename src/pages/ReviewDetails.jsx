//Review Details Page Component
// Full review display with all information

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaStar, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchReviewDetails();
  }, [id]);

  const fetchReviewDetails = () => {
    fetch(`${API_URL}/reviews/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Review not found');
        }
        return res.json();
      })
      .then((data) => {
        setReview(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to load review');
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!review) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Not Found</h2>
        <Link
          to="/all-reviews"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Back to Reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        to="/all-reviews"
        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6"
      >
        <FaArrowLeft /> Back to All Reviews
      </Link>

      {/* Review Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Food Image */}
        <div className="relative h-96">
          <img
            src={review.foodImage}
            alt={review.foodName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Food+Image';
            }}
          />
        </div>

        {/* Review Content */}
        <div className="p-8">
          {/* Food Name */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {review.foodName}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-yellow-400 text-2xl">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? '' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xl font-semibold text-gray-700">
              {review.rating} / 5
            </span>
          </div>

          {/* Restaurant Info */}
          <div className="mb-6 space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Restaurant:</span>
              <span className="ml-2 text-gray-600 text-lg">
                {review.restaurantName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              <span className="text-gray-600 text-lg">{review.location}</span>
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Review</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {review.reviewText}
            </p>
          </div>

          {/* Reviewer Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4">
              <img
                src={review.userPhoto || 'https://via.placeholder.com/60'}
                alt={review.userName}
                className="w-16 h-16 rounded-full border-2 border-orange-500"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/60';
                }}
              />
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  {review.userName}
                </p>
                <p className="text-gray-500 text-sm">
                  Posted on {formatDate(review.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;