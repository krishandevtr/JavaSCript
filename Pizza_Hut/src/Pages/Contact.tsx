import { motion } from "framer-motion"
import { useState } from "react";
import NavBar from "../Components/NavBar";

const Contact = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");



  return (
    <div>
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 '>
        <div className="mb-10">
            <NavBar/>
        </div>
        <motion.div
            className='sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='mt-6 text-center text-3xl font-extrabold text-white hover:text-emerald-400'>Contact Us</h2>
        </motion.div>
        <motion.div
            className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className='bg-white-800 py-8 px-4  sm:rounded-lg sm:px-10 '>
                <form  className='space-y-6'>
                <div>
                        <label htmlFor='fname' className='block text-sm font-medium text-gray-300'>
                            Full Name
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                               
                            </div>
                            <input
                                id='fname'
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value )}
                                className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                placeholder='John Doe'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                            Email Address
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                               
                            </div>
                            <input
                                id='email'
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value )}
                                className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                placeholder='JohnDoe@123.com'
                            />
                        </div>
                        
                    </div>
                    <div>
                        <label htmlFor='description' className='block text-sm font-medium text-gray-300'>
                            Description
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                               
                            </div>
                            <textarea
                                id='description'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value )}
                                className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-emerald-500 sm:text-sm'
                                placeholder='Description'
                            />
                        </div>
                        
                    </div>

                    <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent 
                    rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600
                     focus:outline-none focus:ring-2 focus:ring-offset-2
                       transition duration-150 ease-in-out disabled:opacity-50'

                    >
                        Submit
                    </button>
                </form>



            </div>
        </motion.div>
    </div>
    </div>
  )
}

export default Contact
