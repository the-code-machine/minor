"use client";

import Image from "next/image";
import { Tabs } from "@/utils/Tabs";

export const TabsDemo=()=> {
  const tabs = [
    {
      title: "Students",
      value: "Students",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Students guide</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Mentors",
      value: "Mentors",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Mentors Guide</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Examiners",
      value: "Examiners",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Examiners Guide</p>
          <DummyContent />
        </div>
      ),
    },
    
  
  ];

  return (
    <div id="use" className="h-[120vh] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <img
      src="https://img.freepik.com/free-vector/project-management-business-multitasking-concept-flat-line-art-icons_126523-2192.jpg"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
