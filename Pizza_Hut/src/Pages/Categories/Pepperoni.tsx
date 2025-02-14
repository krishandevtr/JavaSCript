export default function Pepperoni() {
    const pizzas = [
      { name: "Pepperoni Pizza", size: "Medium", price: "$12", image: "https://th.bing.com/th?q=Pepperoni+Pizza+No+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-CA&cc=CA&setlang=en&adlt=strict&t=1&mw=247" },
      { name: "Pepperoni Pizza", size: "Large", price: "$18", image: "https://th.bing.com/th?q=Pepperoni+Pizza+No+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-CA&cc=CA&setlang=en&adlt=strict&t=1&mw=247" }
    ];
  
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="bg-black p-6 rounded-2xl shadow-lg text-white flex flex-col items-center"
            >
              {/* Pizza Image */}
              <img 
                src={pizza.image} 
                alt={pizza.name} 
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
  
              {/* Pizza Details */}
              <div className="bg-black bg-opacity-75 p-4 rounded-xl text-center w-full">
                <h2 className="text-xl font-bold">{pizza.name}</h2>
                <p className="text-gray-300">Size: {pizza.size}</p>
                <p className="text-gray-300">Price: {pizza.price}</p>
                <select className="mt-2 bg-gray-700 text-white p-2 rounded-lg w-full">
                  <option>Select Stuff</option>
                  <option>Extra Cheese</option>
                  <option>Spicy Sauce</option>
                  <option>Olives</option>
                </select>
                <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  