import { Link } from "react-router-dom"

const BuyOneGetOne = () => {
    return (
            <div className="p-10 bg-black">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Explore Our Pizzas 🍕</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="relative group overflow-hidden rounded-2xl">
                    <img
                        src="https://th.bing.com/th/id/OIP.4WdwvCp-TwNOIB4lrOshEQHaE6?rs=1&pid=ImgDetMain"
                        alt="Cheese Pizza"
                        className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <h3 className="text-white text-xl font-semibold">Cheese Pizza</h3>
                    </div>
                </div>

                <Link to="/pepperoni">
                    <div className="relative group overflow-hidden rounded-2xl">

                        <img
                            src="https://wallpaperaccess.com/full/424680.jpg"
                            alt="Pepperoni Pizza"
                            className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <h3 className="text-white text-xl font-semibold">Pepperoni Pizza</h3>
                        </div>
                    </div>
                </Link>


                <div className="relative group overflow-hidden rounded-2xl">
                    <img
                        src="https://images8.alphacoders.com/369/369063.jpg"
                        alt="Veggie Pizza"
                        className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <h3 className="text-white text-xl font-semibold">Veggie Pizza</h3>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                    <img
                        src="https://th.bing.com/th/id/OIP.eR_urIZjUeVuIDtQ2lU1EgHaE8?rs=1&pid=ImgDetMain"
                        alt="Veggie Pizza"
                        className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <h3 className="text-white text-xl font-semibold">Supreme Pizza</h3>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                    <img
                        src="https://img.freepik.com/premium-photo/pizza-with-mushrooms-olives-mushrooms-plategenerative-ai_841229-8320.jpg"
                        alt="Veggie Pizza"
                        className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <h3 className="text-white text-xl font-semibold">Meatza</h3>
                    </div>

                </div>
                <div className="relative group overflow-hidden rounded-2xl">
                    <img
                        src="https://th.bing.com/th/id/OIP.teMOBnBMUBaCB0VN7-2sEgHaEJ?w=325&h=182&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                        alt="Veggie Pizza"
                        className="w-full h-56 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <h3 className="text-white text-xl font-semibold">Hawaiian pizza</h3>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BuyOneGetOne
