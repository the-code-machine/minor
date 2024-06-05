'use client'

import ThreeDCardDemo from "@/utils/Card"

export const Developers= () => {

    const team = [
      
        {
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            name: "Lysa sandiago",
            title: "Head of designers",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
            linkedin: "",
            twitter: "",
            github: ""
        },
        {
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            name: "Lysa sandiago",
            title: "Head of designers",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
            linkedin: "",
            twitter: "",
            github: ""
        },
        {
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            name: "Lysa sandiago",
            title: "Head of designers",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
            linkedin: "",
            twitter: "",
            github: ""
        },
    
    ]

    return (
        <section id="developer" className="py-14 w-full bg-black">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Meet our team of Engineers, designers, and product managers.
                    </h3>
                    <p className="text-gray-600 mt-3">
                      
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {
                            team.map((item, idx) => (
                                <li key={idx+1}>
                               <ThreeDCardDemo   heading={item.name} des={item.desc} src={item.avatar} link={item.linkedin}/></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}