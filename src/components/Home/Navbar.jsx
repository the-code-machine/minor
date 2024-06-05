'use client';
import Link from 'next/link';
import { useState } from 'react'
import { Link as Link1 } from 'react-scroll';
export const NavbarView= () => {

    const [state, setState] = useState(false)

  // Replace javascript:void(0) path with your path
  const navigation = [
      { title: "How to use?", path: "use" },
      { title: "Developers", path: "developer" },
      { title: "Contact us", path: "contact" },
   
  ]
  
    return (
        <div className=''>
            <header className='h-[10vh]'>
                <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
                    <div className="flex justify-between">
                        <a href="/" className='text-black font-semibold text-2xl'>
                           Cognito
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
                          {  <Link href="/auth/login" className="py-3 px-6 rounded-md shadow-md text-white text-center bg-black focus:shadow-none block md:inline">
                                Sign In
                            </Link>}
                        </li>
                        <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => (
                                    <li className="text-gray-500 hover:text-black" key={idx}>
                                        <Link1 smooth duration={2000} className='cursor-pointer' to={item.path}>{item.title}</Link1>
                                    </li>
                                ))
                            }
                        </div>
                    </ul>
                </nav>
            </header>
            <section className=" mx-auto h-[90vh] max-w-screen-xl flex flex-col justify-center items-center pb-4 px-4 sm:px-8">
                <div className="text-center space-y-4">
                    <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
                        Optimize your website for
                         <span className="text-black"> Search engine</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                    </p>
                </div>
                <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                    <Link href="/auth/login" className="px-10 py-3.5 w-full bg-black text-white text-center rounded-md shadow-md block sm:w-auto">
                        Get started
                    </Link>
                
                </div>
            </section>
        </ div>
    )
}