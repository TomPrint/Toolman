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
            <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white ">
                <Link to='/'><span className='flex'><h1 className='w-full text-3xl font-bold text-[#00df9a]'>Toolman</h1><AiOutlineTool size={30} color='#00df9a'/></span></Link>
                <ul className='hidden lg:flex'>
                    <Link to='/'><li className='p-4'>Home</li></Link>
                    <li className='p-4'>Items</li>
                    <li className='p-4'>Workers</li>
                    <li className='p-4'>About</li>
                </ul>
                
                {/* onClick change icon of menu depend on the state */}
                <div onClick={handleNav} className='block lg:hidden' >
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                {/* changes styling depend on the nav state */}
                <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 lg:hidden' : 'ease-in-out duration-500 fixed left-[-100%]'}>
                    <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Toolman</h1>
                        <li className='p-4 border-b border-gray-700'>Home</li>
                        <li className='p-4 border-b border-gray-700'>Items</li>
                        <li className='p-4 border-b border-gray-700'>Workers</li>
                        <li className='p-4 border-b border-gray-700'>About</li>
                </ul>
            </div>
     );
};
 
export default Navbar;