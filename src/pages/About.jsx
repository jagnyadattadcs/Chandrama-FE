import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-16 bg-black text-[rgb(245,220,115)]">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-[rgb(245,220,115)]"
            variants={itemVariants}
          >
            About PlotSell
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <div className="h-64 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <span className="text-black text-lg font-semibold">
                    Plot Visualization
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div className="md:w-1/2" variants={itemVariants}>
              <motion.h3
                className="text-2xl font-semibold mb-4 text-[rgb(245,220,45)]"
                variants={itemVariants}
              >
                Your Trusted Plot Partner
              </motion.h3>

              <motion.p
                className="text-[rgb(245,220,115)] mb-4 leading-relaxed"
                variants={itemVariants}
              >
                PlotSell is revolutionizing the way people buy and sell land. We
                provide a seamless platform connecting buyers and sellers of
                premium plots across the country.
              </motion.p>

              <motion.p
                className="text-[rgb(245,220,115)] mb-6 leading-relaxed"
                variants={itemVariants}
              >
                With our verified listings, transparent pricing, and expert
                guidance, we make plot investment accessible and secure for
                everyone.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={itemVariants}
              >
                {[
                  "Verified Listings",
                  "Legal Assistance",
                  "Site Visits",
                  "Financing Options",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-yellow-300">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div className="mt-8" variants={itemVariants}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-lg transition duration-300 transform hover:-translate-y-1">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
