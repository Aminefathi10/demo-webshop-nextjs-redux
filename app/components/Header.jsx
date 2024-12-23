import Image from "next/image";
import Link from "next/link";
import Search from "./Search.jsx";
import MenuButton from './MenuButton.jsx';
import CartButton from './CartButton.jsx';
import FavoriteButton from './FavoriteButton.jsx';
import SignInButton from './SignInButton.jsx';
import { fetchProductsData } from "../lib/data";




async function Header() {
 
  const products = await fetchProductsData(); 

  return (
    <>
    
      <div className=" bg-cyan-900 p-2 ">
      <div className='width-screen flex pb-2 md:pb-0 justify-between items-center'>
        <div className="flex">
          <MenuButton />
          <Link className="flex items-center" href='/'>
          <Image className="md:h-10" width={170} height={28} src='/logo.png' alt="logo" style={{objectFit: 'contain'}} />
          </Link>
          
          {/* <img className="h-8 md:h-10 cursor-pointer" src={logo} alt="logo" /> */}

        </div>

        <Search products={products} classNames="flex-1 border-2 h-10 border-slate-500 text-slate-500 rounded-md relative pl-3 hidden md:flex items-center focus-within:text-sky-500 focus-within:border-sky-500 ml-2 bg-white cursor-text" /> 
       
        <div className="flex align-center justify-evenly ml-3">
          <CartButton />
          <FavoriteButton />
          <SignInButton />
        </div>
      </div>
    
    <Search products={products} classNames="flex-1 border h-8 border-slate-500 text-slate-500 rounded-md pl-3 relative flex md:hidden items-center focus-within:text-sky-500 focus-within:border-sky-500 bg-white" />

    </div>
    </>
  )
}

export default Header
