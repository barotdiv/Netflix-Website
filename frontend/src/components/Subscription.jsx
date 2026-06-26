import React from "react";

function Subscription() {
    return (
        <div className=" flex flex-col items-center gap-5 py-10">
            <div className="text-center">
                Ready to watch? Enter your email to create or restart your membership.
            </div>
            <div className="flex items-centers">
                <input className="border border-gray-500 p-3 pr-70 mr-2" type="text" placeholder="Email Address" />
                <button className="bg-red-600 text-white text-2xl py-2 px-5 rounded">Get Started</button>
            </div>
        </div>
    );
}

export default Subscription;