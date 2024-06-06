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
          <DummyContent1 />
        </div>
      ),
    },
    {
      title: "Mentors",
      value: "Mentors",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Mentors Guide</p>
          <DummyContent2 />
        </div>
      ),
    },
    {
      title: "Examiners",
      value: "Examiners",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Examiners Guide</p>
          <DummyContent3 />
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

const DummyContent1 = () => {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/cloudburstofficial.appspot.com/o/1.png?alt=media&token=8a500fea-8c3d-4a72-ba65-cc5b8f3d1bd8"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
const DummyContent2= () => {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/cloudburstofficial.appspot.com/o/2.png?alt=media&token=9b6336af-01f9-4f97-acbb-c61380a8f001"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
const DummyContent3 = () => {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/cloudburstofficial.appspot.com/o/3.png?alt=media&token=2f28549a-0624-4b16-a4b5-d09b12f7e335"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
