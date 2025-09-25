import { motion } from "framer-motion";

export default function PlotService() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      {/* Heading Section */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-4"
        style={{ color: "rgb(245,220,115)" }}
      >
        Premium Plot Selling Services
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg text-center max-w-2xl mb-10"
        style={{ color: "rgb(245,220,115)" }}
      >
        Find your dream land with us. We offer affordable, secure, and legally
        verified plots in prime locations to make your investment safe and
        profitable.
      </motion.p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          {
            title: "Residential Plots",
            desc: "Perfectly located plots for your dream home with all basic amenities nearby.",
          },
          {
            title: "Commercial Plots",
            desc: "Prime commercial lands ideal for shops, offices, and business expansion.",
          },
          {
            title: "Farm Lands",
            desc: "Peaceful and fertile lands best suited for farming and weekend retreats.",
          },
        ].map((plot, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            className="rounded-2xl shadow-lg p-6 bg-gray-800 hover:bg-gray-700 cursor-pointer"
          >
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: "rgb(245,220,115)" }}
            >
              {plot.title}
            </h2>
            <p style={{ color: "rgb(245,220,115)" }}>{plot.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-6 py-3 rounded-xl font-semibold shadow-lg"
        style={{
          backgroundColor: "rgb(245,220,115)",
          color: "rgb(30,30,30)",
        }}
      >
        Contact Us Today
      </motion.button>
    </div>
  );
}
