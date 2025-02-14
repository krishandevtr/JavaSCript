import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Pizza {
  id: number;
  title: string;
  image: string;
  price: number;
}

const Pizza: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [trendingPizzas, setTrendingPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza");
        const data = await response.json();
        const formattedPizzas = data.recipes.slice(0, 20).map((recipe: any, index: number) => ({
          id: index,
          title: recipe.title,
          image: recipe.image_url,
          price: (Math.random() * 10 + 5).toFixed(2),
        }));

        setPizzas(formattedPizzas);
        setTrendingPizzas(formattedPizzas.slice(0, 5)); // Pick first 5 as trending
      } catch (error) {
        console.error("Error fetching pizza data:", error);
      }
    };

    fetchPizzas();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Change slide every 3 seconds
    pauseOnHover: true, // Pause when hovered
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  

  return (
    <div className="container mx-auto p-4">
      {/* Trending Heading */}
      <h2 className="text-3xl text-black font-bold text-center mb-6">Trending</h2>

      {/* Trending Pizzas Carousel */}
      <Slider {...settings} className="mb-10">
        {trendingPizzas.map((pizza) => (
          <motion.div
            key={pizza.id}
            className="p-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={pizza.image} alt={pizza.title} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{pizza.title}</h3>
                <div className="w-full flex flex-row justify-around ">
                    <button
                    className="px-5 py-3 bg-yellow-500 font-sans hover:bg-yellow-200 rounded-lg border-r-2 border-2 "
                    
                    >Book Now</button>
                <span className="text-xl font-bold block mt-2">${pizza.price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>

      {/* Full Pizza Menu */}
      <h1 className="text-3xl font-bold text-center mb-6">Pizza Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pizzas.map((pizza, index) => (
          <motion.div
            key={pizza.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={pizza.image} alt={pizza.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pizza.title}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold">${pizza.price}</span>
                <button className="bg-yellow-500 rounded-lg  text-black px-3 py-1 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pizza;
