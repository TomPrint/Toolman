import { useState } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu, AiOutlineTool } from 'react-icons/ai'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const {logout} = useLogout()
    const { user } = useAuthContext()

    //set nav to an opossite value
    const handleNav = () => {
        setNav(!nav);
    };

    const handleLogoutClick = () => {
        logout()
    }

    return ( 
            <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
                <Link to='/'><span className='flex'><h1 className='w-full text-3xl font-bold text-[#00df9a]'>Toolman</h1><AiOutlineTool size={30} color='#00df9a'/></span></Link>
                <ul className='hidden md:flex'>
                    <Link to='/'><li className='p-4 hover:text-[#00df9a] transition-all'>Home</li></Link>
                    <Link to='/items'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>Items</li></Link>
                    <Link to='/items/add'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>New Item</li></Link>
                    <Link to='/workers'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>Workers</li></Link>
                    <Link to='/workers/add'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>New Worker</li></Link>
                    <Link to='/admin'><li className='p-4 hover:text-[#00df9a] transition-all duration-500'>Admin</li></Link>
                    {user &&(
                    <button onClick = {handleLogoutClick} className="px-1 ml-4 bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white text-sm rounded-full">Log out <span className="text-xs">{user.email}</span></button>)}
                     {!user && (<div></div>)}
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
                        <li className='p-4 border-b border-gray-500'>
                        {user &&(
                    <button onClick = {handleLogoutClick} className="px-2 ml-4 bg-gray-500 hover:bg-[#00df9a] transition-all duration-500 text-white text-sm rounded-full">Log out <span className="text-xs">{user.email}</span></button>)}
                     {!user && (<div></div>)}
                    </li>
                        
                </ul>
            </div>
     );
};
 
export default Navbar;