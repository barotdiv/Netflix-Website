import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
function Questions() {
    const [activeIndex, setActiveIndex] = useState(null)
    const handleTogle = (id) => {
        setActiveIndex((prevId) => (prevId === id ? null : id))
    }
    const questionAns = [
        {
            id: 1,
            question: "What is Netflix",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laboriosam incidunt minus odio voluptatum voluptatem iure inventore possimus consectetur! Vero repellendus doloremque velit debitis quo, rem minima! Cum, dolor soluta.",
        },
        {
            id: 2,
            question: "Why netflix is important?",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laboriosam incidunt minus odio voluptatum voluptatem iure inventore possimus consectetur! Vero repellendus doloremque velit debitis quo, rem minima! Cum, dolor soluta.",
        },
        {
            id: 3,
            question: "Where to find netflix subscriptions",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laboriosam incidunt minus odio voluptatum voluptatem iure inventore possimus consectetur! Vero repellendus doloremque velit debitis quo, rem minima! Cum, dolor soluta.",
        },
        {
            id: 4,
            question: "Where to find netflix subscriptions",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laboriosam incidunt minus odio voluptatum voluptatem iure inventore possimus consectetur! Vero repellendus doloremque velit debitis quo, rem minima! Cum, dolor soluta.",
        },
        {
            id: 5,
            question: "Where to find netflix subscriptions",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laboriosam incidunt minus odio voluptatum voluptatem iure inventore possimus consectetur! Vero repellendus doloremque velit debitis quo, rem minima! Cum, dolor soluta.",
        },
    ];
    return (
        <div className="py-10 h-screen">
            <div className="text-2xl font-bold">Frequently Asked Questions</div>
            {questionAns.map((item) => {
                return (
                    <div key={item.id}>
                        <div onClick={() => handleTogle(item.id)} className="cursor-pointer text-2xl bg-gray-800 p-5 flex items-center justify-between px-10 mt-3">
                            <div className="">{item.question}</div>
                            <div className="text-5xl duration-500 ">
                                {activeIndex === item.id ? "x" : "+"}
                            </div>
                        </div>
                        <div className={`bg-gray-800 overflow-hidden text-xl ${activeIndex === item.id ? "max-h-[500px]" : "max-h-0"} duration-500 px-5 mt-1`}>
                            {item.answer}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Questions;