import { motion } from "framer-motion";

const AboutContent = () => {
    return (
        <div className="flex flex-col w-full h-[100%] px-5 py-3 text-white">
            {/* Section 1 - Content & Image */}
            <motion.div
                className="flex flex-row w-full mb-8"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex-1 p-5">
                    <h2 className="text-2xl font-bold">Our Story</h2>
                    <p className="mt-2 text-gray-300">Discover the journey behind our brand and what drives us forward. Our story is one of passion, dedication, and a relentless pursuit of excellence in the culinary world.</p>
                    <p className="mt-2 text-gray-300">From humble beginnings to becoming a trusted name, we have always believed in quality, creativity, and customer satisfaction.</p>
                    <p className="mt-2 text-gray-300">Striving to create the best culinary experiences for our guests. From sourcing the freshest ingredients to crafting exquisite dishes, our passion for food drives us forward.</p>
                    <p className="mt-2 text-gray-300">Our chefs blend tradition with innovation, ensuring every bite is a delightful journey of flavors.</p>
                    <p className="mt-2 text-gray-300">We believe in sustainability and ethical sourcing, working closely with local farmers and suppliers to deliver quality with integrity.</p>
                </div>
                <div className="flex-1 flex justify-center  overflow-hidden shadow-lg">
                    <img src="https://static.vecteezy.com/system/resources/previews/005/285/094/original/pizza-logo-with-illustration-a-piece-of-pizza-free-vector.jpg" alt="Our Story" className="rounded-lg shadow-lg w-80" />
                </div>
            </motion.div>

            {/* Section 2 - Image & Content */}
            <motion.div
                className="flex flex-row w-full mb-8"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex-1 flex justify-center rounded-lg overflow-hidden shadow-lg">
                    <img src="https://th.bing.com/th/id/OIP.w7y1Cp4MTapE7YYM99_78gHaE8?rs=1&pid=ImgDetMain" alt="Our Community" className="rounded-lg shadow-lg w-80" />
                </div>
                <div className="flex-1 p-5">
                    <h2 className="text-2xl font-bold">Our Community</h2>
                    <p className="mt-2 text-gray-300">We are proud to be part of a vibrant, diverse community that thrives on collaboration and mutual support. Our strength lies in the relationships we build with each other and the shared passion for growth and empowerment.</p>
                    <p className="mt-2 text-gray-300">Through meaningful connections, we encourage innovation, share knowledge, and celebrate the success of everyone involved. Together, we create an environment where everyone can thrive.</p>
                    <p className="mt-2 text-gray-300">We prioritize inclusivity, and our commitment to supporting local initiatives ensures we’re not just a community; we’re a movement that inspires positive change.</p>
                </div>
            </motion.div>

            {/* Section 3 - Top Chefs */}
            <div className="flex flex-col items-center my-8">
                <h2 className="text-2xl font-bold mb-4">Meet Our Top Chefs</h2>
                <div className="flex gap-5">
                    <motion.div
                        className="w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8,delay:1.5 }}
                        viewport={{ once: true }}
                    >
                        <img src="https://th.bing.com/th/id/OIP.iZTK7DWQ3TAan_L-trP-8QHaLF?rs=1&pid=ImgDetMain" alt="Chef 1" className="w-32 h-32 rounded-full object-cover mb-3" />
                        <h3 className="text-lg font-semibold">Chef John Doe</h3>
                        <p className="text-gray-600">Head Chef</p>
                    </motion.div>
                    <motion.div
                        className="w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8,delay:1.5 }}
                        viewport={{ once: true }}
                    >
                        <img src="https://th.bing.com/th/id/OIP.1CYjTyhN4jFLI_BEpPESYAHaEg?w=1114&h=678&rs=1&pid=ImgDetMain" alt="Chef 2" className="w-32 h-32 rounded-full object-cover mb-3" />
                        <h3 className="text-lg font-semibold">Chef Jane Smith</h3>
                        <p className="text-gray-600">Sous Chef</p>
                    </motion.div>
                    <motion.div
                        className="w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 ,delay:1.5}}
                        viewport={{ once: true }}
                    >
                        <img src="https://www.greece-is.com/wp-content/uploads/2017/11/11-mavri-xhna-0017.jpg" alt="Chef 3" className="w-32 h-32 rounded-full object-cover mb-3" />
                        <h3 className="text-lg font-semibold">Chef Alex Brown</h3>
                        <p className="text-gray-600">Pastry Chef</p>
                    </motion.div>
                </div>
            </div>

            {/* Section 4 - Awards */}
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Our Awards</h2>
                <div className="flex gap-5">
                    <motion.div
                        className="p-5 bg-yellow-400 text-white rounded-lg shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8,delay:1.5 }}
                        viewport={{ once: true }}
                    >
                        Best Margherita Pizza - 2024
                    </motion.div>
                    <motion.div
                        className="p-5 bg-yellow-400 text-white rounded-lg shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Most Creative Topping - 2023
                    </motion.div>
                    <motion.div
                        className="p-5 bg-yellow-400 text-white rounded-lg shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8,delay:1.5 }}
                        viewport={{ once: true }}
                    >
                        Top Pizza Restaurant - 2025
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
