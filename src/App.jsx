import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import AllReviews from './pages/AllReviews';
import AddReview from './pages/AddReview';
import MyReviews from './pages/MyReviews';
import MyFavorites from './pages/MyFavorites';
import ReviewDetails from './pages/ReviewDetails';
import UpdateReview from './pages/UpdateReview';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/all-reviews" element={<AllReviews />} />
          <Route path="/reviews/:id" element={<ReviewDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/add-review"
            element={
              <PrivateRoute>
                <AddReview />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-reviews"
            element={
              <PrivateRoute>
                <MyReviews />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-favorites"
            element={
              <PrivateRoute>
                <MyFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-review/:id"
            element={
              <PrivateRoute>
                <UpdateReview />
              </PrivateRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;