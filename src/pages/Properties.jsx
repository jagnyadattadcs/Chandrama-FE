import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertyComponent() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("https://chandramarealconbackend.onrender.com/api/plots");
        setProperties(res.data.plots || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  // Fetch details when clicking "View Details"
  const handleViewDetails = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // if login is required
      const res = await axios.get(`https://chandramarealconbackend.onrender.com/api/plots/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSelectedProperty(res.data.plot);
    } catch (err) {
      console.error("Error fetching details:", err);
      alert("Login required to view details!");
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: "0 0 25px rgba(245,220,115,0.7)" },
  };

  const detailVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="p-6 bg-black min-h-screen text-[rgb(245,220,115)]">
      <h1 className="text-3xl font-bold mb-20 text-center drop-shadow-md ">
        Available Properties
      </h1>

      {/* Property List */}
      <AnimatePresence>
        {!selectedProperty && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {properties.map((p) => (
              <motion.div
                key={p.id}
                className="border rounded-lg shadow-lg overflow-hidden bg-gray-900 border-[rgb(245,220,115)]"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <img
                  src={p.image || "https://via.placeholder.com/200"}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-1">{p.name}</h2>
                  <h2 className="text-xl text-gray-300">Location : {p.location}</h2>
                  <p className="text-gray-300">Land Mark : {p.address}</p>
                  <p className="text-gray-300">Area : {p.squareFeet} sqft</p>
                  <p className="text-gray-300">Price : ₹ {p.price} lakhs</p>

                  <motion.button
                    onClick={() => handleViewDetails(p.id)}
                    className="mt-3 w-full px-4 py-2 bg-[rgb(245,220,115)] text-black font-semibold rounded hover:brightness-110"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property Details */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-2xl mt-6"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.button
              onClick={() => setSelectedProperty(null)}
              className="mb-4 px-4 py-2 bg-gray-700 text-[rgb(245,220,115)] rounded hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to List
            </motion.button>

            <h2 className="text-2xl font-bold mb-4">{selectedProperty.name}</h2>
            <img
              src={
                selectedProperty.images?.[0] ||
                "https://via.placeholder.com/400"
              }
              alt={selectedProperty.name}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <p>
              <strong>Location:</strong> {selectedProperty.location}
            </p>
            <p>
              <strong>Address:</strong> {selectedProperty.address}
            </p>
            <p>
              <strong>Square Feet:</strong> {selectedProperty.squareFeet}
            </p>
            <p>
              <strong>Price:</strong> ₹ {selectedProperty.price}
            </p>
            <p>
              <strong>Facing:</strong> {selectedProperty.facing}
            </p>
            <p>
              <strong>Boundary:</strong> {selectedProperty.boundary}
            </p>
            <p className="mt-2">
              <strong>Description:</strong> {selectedProperty.description}
            </p>
            {selectedProperty.amenities?.length > 0 && (
              <div className="mt-2">
                <strong>Amenities:</strong>
                <ul className="list-disc ml-6">
                  {selectedProperty.amenities.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && <p className="mt-4 text-gray-400">Loading...</p>}
    </div>
  );
}
