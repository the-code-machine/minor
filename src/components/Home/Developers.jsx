'use client'

import ThreeDCardDemo from "@/utils/Card"

export const Developers= () => {

    const team = [
      
        {
            avatar: "https://media.licdn.com/dms/image/D4D03AQFUHnGdTJC5hw/profile-displayphoto-shrink_800_800/0/1716127531824?e=1723075200&v=beta&t=8DR8fU20ocWl-dN9f1kWT-a1yHgcsuCjwh2wCLzDVQM",
            name: "Sarthak Khare",
            title: "Head of designers",
            desc: "Frontend & Backend Developer",
            linkedin: "https://www.linkedin.com/in/sarthak-khare-898084253/",
            twitter: "",
            github: ""
        },
        {
            avatar: "https://media.licdn.com/dms/image/D4D35AQGojFwVxeIRQA/profile-framedphoto-shrink_800_800/0/1714336166986?e=1718251200&v=beta&t=outcctWH83FD84xeksFp0OF5YZ5w-o3WZtQ5_WBAIIQ",
            name: "Shreya Dwivedi",
            title: "Head of designers",
            desc: "DataBase Architect ",
            linkedin: "https://www.linkedin.com/in/shreya-dwivedi-494155223/",
            twitter: "",
            github: ""
        },
        {
            avatar: "https://media.licdn.com/dms/image/D4D03AQHRY2XHRQ1Bkg/profile-displayphoto-shrink_800_800/0/1716998925288?e=1723075200&v=beta&t=Gvb3YCHhh50Ev6ZpTmYHhHhBDASAZf3mOOkLwKwdGxU",
            name: "Dev Jadiya",
            title: "Head of designers",
            desc: "DevOps Engineer & Software Developer",
            linkedin: "https://www.linkedin.com/in/devjadiya/",
            twitter: "",
            github: ""
        },
        {
            avatar: "https://media.licdn.com/dms/image/C4D03AQHHYa0IPnTleQ/profile-displayphoto-shrink_800_800/0/1655957252585?e=1723075200&v=beta&t=4Q-FG2D7SoC0BTmbrd-SsVQ3V8UAf6g7hCM6DWhL2Uc",
            name: "Aryan Parashar",
            title: "Head of designers",
            desc: "Cyber Security Analyst & VAPT",
            linkedin: "https://www.linkedin.com/in/aryanparashar-sati/",
            twitter: "",
            github: ""
        },
    
    ]

    return (
        <section id="developer" className="py-14 w-full bg-black">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Meet our team of Machine Learning Engineers, designers, and DataBase managers.
                    </h3>
                    <p className="text-gray-600 mt-3">
                      
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
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