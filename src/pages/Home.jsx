//Home Page Component
// Features hero slider, featured reviews, and info sections

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFeaturedReviews();
  }, []);

  const fetchFeaturedReviews = () => {
    fetch(`${API_URL}/reviews/featured`)
      .then((res) => res.json())
      .then((data) => {
        setFeaturedReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to load reviews');
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Hero Slider */}
      <section className="mb-16">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="h-[400px] md:h-[500px]"
        >
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Delicious Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover Local Food Gems
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    Share and explore amazing food experiences
                  </p>
                  <Link
                    to="/all-reviews"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Explore Reviews
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
                alt="Restaurant Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Rate Your Favorites
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    Help others discover great places to eat
                  </p>
                  <Link
                    to="/add-review"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add Review
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                alt="Street Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Join Our Community
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    Connect with fellow food enthusiasts
                  </p>
                  <Link
                    to="/register"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Featured Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Reviews
          </h2>
          <p className="text-gray-600">Check out our top-rated food experiences</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : featuredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No reviews yet. Be the first to add one!</p>
            <Link
              to="/add-review"
              className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Add Review
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onFavoriteToggle={fetchFeaturedReviews}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/all-reviews"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Show All Reviews
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Additional Section 1: Why Join Us */}
      <section className="bg-gray-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Join Local Food Lovers?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🍔</div>
              <h3 className="text-2xl font-bold mb-2">Discover Hidden Gems</h3>
              <p className="text-gray-600">
                Find amazing local restaurants and street food that others love
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
              <p className="text-gray-600">
                Rate and review your favorite food spots to help the community
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-2">Connect with Foodies</h3>
              <p className="text-gray-600">
                Join a community of passionate food lovers in your area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Section 2: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-500">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Sign Up</h3>
            <p className="text-gray-600">Create your free account in seconds</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-500">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Explore</h3>
            <p className="text-gray-600">Browse reviews from fellow food lovers</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-500">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Review</h3>
            <p className="text-gray-600">
              Share your own food experiences with photos
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-500">
              4
            </div>
            <h3 className="text-xl font-bold mb-2">Enjoy</h3>
            <p className="text-gray-600">Discover amazing food and make new friends</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;