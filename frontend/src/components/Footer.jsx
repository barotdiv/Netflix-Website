import React from "react";

function Footer() {
    return (
        <div className="pb-20 text-[16px] text-gray-400">
            <div className="  underline">
                <div className="mb-10">Questions? Contact us.</div>
                <div className="flex justify-between">
                    <div className="w-[200px] list-none">
                        <li>FAQ</li>
                        <li>Help</li>
                        <li>Center</li>
                        <li>Account</li>
                        <li>Media</li>
                    </div>
                    <div className="w-[200px] list-none">
                        <li>FAQ</li>
                        <li>Help</li>
                        <li>Center</li>
                        <li>Account</li>
                        <li>Media</li>
                    </div>
                    <div className="w-[200px] list-none">
                        <li>FAQ</li>
                        <li>Help</li>
                        <li>Center</li>
                        <li>Account</li>
                        <li>Media</li>
                    </div>
                    <div className="w-[200px] list-none">
                        <li>FAQ</li>
                        <li>Help</li>
                        <li>Center</li>
                        <li>Account</li>
                        <li>Media</li>
                    </div>
                </div>

                <div>
                    <select className="text-white border border-gray-500 py-1 px-2 pr-20 my-5 rounded" name="" id="">
                        <option className="text-black" value="English">English</option>
                        <option className="text-black" value="Arabic">Arabic</option>
                    </select>
                </div>
            </div>
            <div className=" mt-10">
                <div>Netflix Norway</div>
                <div className="text-[12px]">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    <span className="text-blue-500 underline">Learn more</span>.
                </div>
            </div>
        </div>
    );
}

export default Footer;