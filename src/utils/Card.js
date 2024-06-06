import React from "react";
import { CardBody, CardContainer, CardItem } from "./Card_";
import Link from "next/link";


function ThreeDCardDemo(props) {
  return (
    <CardContainer className="inter-var">
      <CardBody className=" bg-white relative group/card w-60  h-auto rounded-xl p-3   ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-black dark:text-white"
        >
          {props.heading}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="ttext-black text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {props.des}
        </CardItem>
        <CardItem translateZ="100" className=" mt-4">
          <img
            src={props.src}
            height="1000"
            width="1000"
            className="h-32 object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
       <CardItem
            translateZ={20}
           
            target="__blank"
            className="px-4 py-2 rounded-xl text-lg font-medium cursor-pointer ttext-black hover:bg-[#c29e70] dark:text-white"
          >
            LinkedIn
          </CardItem>

         <Link href={props.link}><CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-black text-3xl font-bold"
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
          </CardItem></Link> 
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ThreeDCardDemo;
