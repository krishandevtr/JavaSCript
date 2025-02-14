import { useState, useEffect } from "react";
import { animate, inertia, motion } from "framer-motion";
import NavBar from "./NavBar";

const arrayImage = [
    "https://img.freepik.com/premium-photo/levitation-pizza-black-background_327072-11455.jpg",
    "https://img.freepik.com/premium-photo/pizza-slice-black-background_841543-13900.jpg",
    "https://img.freepik.com/premium-photo/levitation-pizza-black-background_327072-11449.jpg",
    "https://img.freepik.com/premium-photo/levitation-pizza-black-background_327072-11420.jpg",
];

const text = "";

// Animation variants for letter-by-letter effect



const MainArea = () => {
    const [currentImage, setCurrentImage] = useState(arrayImage[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                const currentIndex = arrayImage.indexOf(prevImage);
                const nextIndex = (currentIndex + 1) % arrayImage.length;
                return arrayImage[nextIndex];
            });
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex-grow flex items-center justify-center">
            <div className="flex flex-col w-full h-full p-6">
                <div>
                    <NavBar/>
                </div>
                {/* First partition */}
                <div className="flex flex-col md:flex-row w-full">
                    {/* Left Side (Text) */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <motion.h1
                            initial={{ opacity: 0, y: "-100vh" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-4xl font-bold text-[#F4A300] mb-4 text-center">
                            Welcome To Pizza Paradise
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: "-100vh" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-lg md:text-xl font-semibold text-white text-center"
                        >
                            At Pizza Paradise, we serve the perfect slice made with the finest ingredients, bringing people together over delicious flavors.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: "100vh" }}  
                            animate={{ opacity: 1, y: 0 }}       
                            transition={{ duration: 0.8 }}  
                            whileHover={{scale:1.5}}
                            className="bg-[#F4A300] mt-2 text-black py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#D48F00] transition duration-300">
                            Order Now
                        </motion.button>

                    </div>

                    {/* Right Side (Image) */}
                    <div className="flex-1 flex items-center justify-center">
                        <motion.img
                            key={currentImage}
                            src={currentImage}
                            alt="Pizza"
                            className="w-[80%] md:w-[60%] sm:w-[30%] h-auto object-cover rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: "100vw" }} 
                            animate={{ opacity: 1, x: 0 }}  
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>

                {/* Second Partition */}
                <div className="flex-1 flex items-center justify-center mt-6 bg-white">



                </div>
            </div>
        </div>
    );
};

export default MainArea;
