import Image from 'next/image';
import { SearchIcon, MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../../slices/basketSlice';

function Header() {
    const [session] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    return (
        <header>
            {/* Top Nav */}
            <div className='flex bg-amazon_blue flex-grow items-center p-1 py-2'>

                {/* Left side */}
                <div className='flex flex-grow sm:flex-grow-0 mt-2 items-center'>
                    <Image 
                        onClick={() => router.push('/')}
                        className='cursor-pointer'
                        src='https://media.idownloadblog.com/wp-content/uploads/2020/11/Amazon-logo.png'
                        // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiXRESXWWwhcUEg0HX39YfI6XTMsYIljHiXQ&usqp=CAU'
                        width= '150' height= '40'
                        objectFit= 'contain'
                        alt=''
                    />
               </div>

               {/* Center search bar */}
               <div className='hidden sm:flex h-10 items-center rounded-md bg-yellow-400 hover:bg-yellow-500
                cursor-pointer flex-grow' >
                   <input type="text" className='flex-grow flex-shrink h-full p-2 w-6 rounded-l-md
                    active: outline-none px-4' />
                   <SearchIcon className='h-12 p-4' />
               </div>

                {/* Right side */}
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap' >
                    <div className='link' onClick={!session ? signIn : signOut} >
                        <p>{session ? `Hello ${session.user.name}` : `Sign In`}</p>
                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>
                    <div onClick={() => router.push('/orders')} className='link'>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div className='link relative flex items-center' onClick={() => router.push('/checkout')} >
                        <span className='absolute top-0 right-0 md:right-10 bg-yellow-400 text-center 
                            rounded-full text-black font-bold h-4 w-4'>
                                {items.length}
                        </span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>

            </div>

            {/* Bottom Nav */}
            <div className='flex items-center bg-amazon_blue-light text-white text-sm p-2 pl-6 space-x-3'>
                <div className='link flex items-center'>
                    <MenuIcon className='h-6 mr-1'/>
                    All
                </div>
                <div className='link'>Prime Video</div>
                <div className='link'>Amazon Business</div>
                <div className='link'>Todays Deals</div>
                <div className='link hidden lg:inline-flex'>Electronics</div>
                <div className='link hidden lg:inline-flex'>Food & Grocery</div>
                <div className='link hidden lg:inline-flex'>Prime</div>
                <div className='link hidden lg:inline-flex'>Buy Again</div>
                <div className='link hidden lg:inline-flex'>Shopper Toolkit</div>
                <div className='link hidden lg:inline-flex'>Health & Personal Care</div>

            </div>
        </header>
    )
}

export default Header
