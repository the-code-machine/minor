'use client'

import Link from "next/link"
import { useSelector } from "react-redux"

export const Footer = () => {
const user = useSelector((state)=>state.auth)
    const footerNavs = [
        {
            href: 'https://www.linkedin.com/in/sarthak-khare-898084253/',
            name: 'LinkedIn'
        },
        {
            href: 'https://www.instagram.com/sarthak_io',
            name: 'Instgram'
        },
        {
            href: 'https://github.com/the-code-machine/',
            name: 'Github'
        },
       
    ]
    return (
        <footer className=" shadow-md w-full bg-black lg:px-32 pt-10 ">
            <div className="px-4  text-gray-600 md:px-8">
                <div className="space-y-6  sm:text-center">
              <h1 className=" text-white font-semibold text-2xl">Submify</h1>
                    <p>
                    Sumify is a comprehensive platform designed for college students, mentors, and examiners to efficiently submit, review, and manage minor projects in computer science. Our goal is to streamline project workflows and foster collaboration within the academic community.
                    </p>
                    <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
                       { user.token != null?<Link href={`/dashboard/${user.userType}`} className="block py-2 px-4 text-center bg-white font-medium text-black duration-150  rounded-lg shadow-lg hover:shadow-none">
                            DashBoard
                        </Link>: <Link href="/auth/login" className="block py-2 px-4 text-center bg-white font-medium text-black duration-150  rounded-lg shadow-lg hover:shadow-none">
                            Lets get started
                        </Link>}
                      
                    </div>
                </div>
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p>© 2024 Submify Inc. All rights reserved.</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li key={idx+1} className="text-gray-800 hover:text-white duration-150">
                                    <Link key={idx} href={item.href}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    )
}