//All Reviews Page Component
// Displays all reviews with MongoDB search functionality

import { useEffect, useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = () => {
    setLoading(true);
    fetch(`${API_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to load reviews');
        setLoading(false);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      fetchAllReviews();
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(`${API_URL}/reviews/search/${searchQuery}`);
      const data = await response.json();
      setReviews(data);
      
      if (data.length === 0) {
        toast('No reviews found', { icon: '🔍' });
      } else {
        toast.success(`Found ${data.length} review(s)`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchAllReviews();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Reviews</h1>
        <p className="text-gray-600">Explore food reviews from our community</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by food name..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            {searchQuery ? 'No reviews found matching your search' : 'No reviews yet'}
          </p>
          {!searchQuery && (
            <p className="text-gray-500">Be the first to add a review!</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onFavoriteToggle={fetchAllReviews}
              />
            ))}
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Showing {reviews.length} review(s)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AllReviews;