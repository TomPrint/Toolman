import { useState } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu, AiOutlineTool } from 'react-icons/ai'

const Navbar = () => {
    const [nav, setNav] = useState(false)


    //set nav to an opossite value
    const handleNav = () => {
        setNav(!nav);
    };

    return ( 
            <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
                <Link to='/'><span className='flex'><h1 className='w-full text-3xl font-bold text-[#00df9a]'>Toolman</h1><AiOutlineTool size={30} color='#00df9a'/></span></Link>
                <ul className='hidden md:flex'>
                    <Link to='/'><li className='p-4 hover:text-[#00df9a] transition-all'>Home</li></Link>
                    <Link to='/items'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>Items</li></Link>
                    <Link to='/items/add'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>New Item</li></Link>
                    <li className='p-4 hover:text-[#00df9a] transition-all duration-500'>Workers</li>
                    <Link to='/admin'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>Admin</li></Link>
                    <button className="px-2 ml-4 bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white text-sm rounded-full">Log out</button>
                </ul>
                
                {/* onClick change icon of menu depend on the state */}
                <div onClick={handleNav} className='block md:hidden' >
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                {/* changes styling depend on the nav state */}
                <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-y bg-[#2E4053] ease-in-out duration-500 md:hidden' : 'ease-in-out duration-500 fixed left-[-100%]'}>
                    <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Menu</h1>
                        <li className='p-4 border-b border-gray-500'>Home</li>
                        <li className='p-4 border-b border-gray-500'>Items</li>
                        <li className='p-4 border-b border-gray-500'>Workers</li>
                        <li className='p-4 border-b border-gray-500'>Admin</li>
                </ul>
            </div>
     );
};
 
export default Navbar;