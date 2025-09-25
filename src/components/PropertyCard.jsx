import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import PropertyDetails from "./PropertyDetails";
import AuthModal from "./AuthModal";
import { IoLocationOutline } from "react-icons/io5";
import { BackenUrl } from "../utils/constant";

export default function PropertyCard({ property, onInterested }) {
  const { user } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewDetails = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BackenUrl}/plots/${property.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(token);

      if (!response.ok) {
        throw new Error("Failed to fetch property details");
      }
      const data = await response.json();
      console.log(data);

      setPropertyDetails(data.plot);
      setShowDetails(true);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching property details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInterestedClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    onInterested(property.id);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setPropertyDetails(null);
    setError(null);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 0 25px rgba(245, 220, 65, 0.7)",
      borderColor: "rgb(245,220,65)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#f5dc73",
      color: "#000000",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const secondaryButtonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#f5dc73",
      color: "#000000",
      borderColor: "#f5dc73",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.div
        className="bg-black shadow-xl rounded-xl overflow-hidden border-2 border-yellow-500 transition-all duration-300"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        layout
      >
        <motion.div className="overflow-hidden">
          <motion.img
            src={property.image}
            alt={property.title}
            className="w-full h-56 "
            variants={imageVariants}
            whileHover="hover"
          />
        </motion.div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-[rgb(245,220,115)] mb-1 drop-shadow-md">
            {property.name}
          </h2>

          <div className="flex items-center text-gray-300 mb-2">
            <IoLocationOutline className="mr-2 text-lg text-[rgb(245,220,65)]" />
            <p>{property.location}</p>
          </div>
          <div className="flex items-center text-gray-300 mb-2">
            <IoLocationOutline className="mr-2 text-lg text-[rgb(245,220,65)]" />
            <p>{property.address}</p>
          </div>

          <div className="flex items-center text-gray-300 text-sm mb-4">
            <p>
              Total Area:{" "}
              <span className="font-semibold text-[rgb(245,220,65)]">
                {property.squareFeet} Sqft
              </span>
            </p>
          </div>

          <div className="mt-4">
            <div className="flex space-x-2 mt-4">
              <motion.button
                onClick={handleViewDetails}
                className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium border-2 border-yellow-500 shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={loading}
              >
                {loading ? "Loading..." : "View Details"}
              </motion.button>

              <motion.button
                onClick={handleInterestedClick}
                className="bg-black text-yellow-500 border-2 border-yellow-500 px-5 py-2 rounded-full text-sm font-medium shadow-md"
                variants={secondaryButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Interested
              </motion.button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="m-4 p-3 bg-red-900 text-red-100 rounded-lg border border-red-400 shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>

      {/* Property Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <PropertyDetails
            property={propertyDetails || property}
            onClose={handleCloseDetails}
            loading={loading}
          />
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </AnimatePresence>
    </>
  );
}
