import { motion } from 'framer-motion'
import BuyOneGetOne from '../Components/BuyOneGetOne'
import Pizza from '../Components/Pizza'

const Menu = () => {
    return (
        < div className="bg-white flex-col bg-cover bg-center flex w-[100%] h-[100%]">

            <BuyOneGetOne />
            <Pizza />
        </div>
    )
}

export default Menu
