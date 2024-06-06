'use client';
import Link from 'next/link';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link as Link1 } from 'react-scroll';
import { SparklesPreview } from './Hero';
const navigation = [
    { title: "How to use?", path: "use" },
    { title: "Developers", path: "developer" },
    { title: "Contact us", path: "contact" },
 
]
export const NavbarView= () => {

    const [state, setState] = useState(false)
 const user = useSelector((state)=>state.auth)
 

  
    return (
        <div className=' w-full  bg-black-2'>
            <header className='h-[10vh]'>
                <nav className="items-center py-5  shadow w-full justify-center px-32 md:flex md:space-x-6">
                    <div className="flex justify-between">
                        <a href="/" className='text-black  font-bold text-2xl'>
                           Submify
                        </a>
                        <button className="text-gray-500 outline-none md:hidden"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                    <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${state ? '' : 'hidden'}`}>
                        <li className="order-2 pb-5 md:pb-0">
                          { user?.token != null ?<Link href={`/dashboard/${user?.userType}`} className="py-3 px-6 rounded-md shadow-md text-white text-center bg-black focus:shadow-none block md:inline">
                                DashBoard
                            </Link>: <Link href="/auth/login" className="py-3 px-6 rounded-md shadow-md text-white text-center bg-black focus:shadow-none block md:inline">
                                Sign In
                            </Link>}
                        </li>
                        <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => (
                                    <li className="text-white hover:text-black" key={idx}>
                                        <Link1 smooth duration={2000} className='cursor-pointer' to={item.path}>{item.title}</Link1>
                                    </li>
                                ))
                            }
                        </div>
                    </ul>
                </nav>
            </header>
<SparklesPreview/>

        </ div>
    )
}