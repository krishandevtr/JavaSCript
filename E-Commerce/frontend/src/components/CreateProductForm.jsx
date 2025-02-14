import { useState } from 'react'
const categories = ["jeans", "t-shirt", "shoes", "glasses", "jacket", "suits", "bags"];
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from '../stores/useProductStore';
import toast from 'react-hot-toast';
const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });
    const { createProduct, loading } = useProductStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                await createProduct(newProduct)
                setNewProduct({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    image: "",
                });
            } catch (error) {
                console.log("Error in creating a product , handleSubmit ")
            }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        // Check if a file is selected and if it is an image
        if (file) {
            // Maximum size in bytes (e.g., 5 MB = 5 * 1024 * 1024 bytes)
            const MAX_SIZE = 5 * 1024 * 1024; 
    
            // Check if file is an image and its size
            if (file.type.startsWith('image/') && file.size <= MAX_SIZE) {
                const reader = new FileReader();
    
                reader.onloadend = () => {
                    // Update the state with the image
                    setNewProduct({ ...newProduct, image: reader.result });
                };
    
                reader.readAsDataURL(file); // Convert to base64 URL
            } else if (file.size > MAX_SIZE) {
                toast.error("The image file is too large. Please select a smaller image.")
            } else {
                toast.error("Please select a valid image file.")
            }
        }
    };
    
    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>
            <form className='space-y-4' onSubmit={handleSubmit}  >
                <div className=''>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                        Product Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
                </div>
                <div className=''>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        rows='3'
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
						 focus:border-emerald-500'
                        required
                    />
                </div>
                <div className=''>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                        Price
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
                </div>
                <div className=''>
                    <label htmlFor='category' className='block text-sm font-medium text-gray-300 '>
                        Category
                    </label>
                    <select
                        id='category'
                        name='category'
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 '
                        required

                    >
                        <option value=''>Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mt-1 flex items-center mb-3'>
                    <input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
                    <label
                        htmlFor='image'
                        className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                    >
                        <Upload className='h-5 w-5 inline-block mr-2' />
                        Upload Image
                    </label>
                    {newProduct.image && <motion.div className='inline-block px-10  text-m text-gray-400'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Image Uploaded

                    </motion.div>}
                </div>
                <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                            Loading...
                        </>
                    ) : (
                        <>
                            <PlusCircle className='mr-2 h-5 w-5' />
                            Create Product
                        </>
                    )}
                </button>

            </form>


        </motion.div>
    )
}

export default CreateProductForm
