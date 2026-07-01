import React from "react";

function Footer() {
    const footerColumns = [
        [
            { id: "col1-faq", text: "FAQ" },
            { id: "col1-help", text: "Help" },
            { id: "col1-center", text: "Center" },
            { id: "col1-account", text: "Account" },
            { id: "col1-media", text: "Media" },
        ],
        [
            { id: "col2-faq", text: "FAQ" },
            { id: "col2-help", text: "Help" },
            { id: "col2-center", text: "Center" },
            { id: "col2-account", text: "Account" },
            { id: "col2-media", text: "Media" },
        ],
        [
            { id: "col3-faq", text: "FAQ" },
            { id: "col3-help", text: "Help" },
            { id: "col3-center", text: "Center" },
            { id: "col3-account", text: "Account" },
            { id: "col3-media", text: "Media" },
        ],
        [
            { id: "col4-faq", text: "FAQ" },
            { id: "col4-help", text: "Help" },
            { id: "col4-center", text: "Center" },
            { id: "col4-account", text: "Account" },
            { id: "col4-media", text: "Media" },
        ],
    ];

    return (
        <div className="pb-20 text-[16px] text-gray-400">
            <div className="  underline">
                <div className="mb-10">Questions? Contact us.</div>
                <div className="flex justify-between">
                    {footerColumns.map((column, colIndex) => (
                        <div key={`col-${colIndex}`} className="w-[200px] list-none">
                            {column.map((link) => (
                                <li key={link.id}>{link.text}</li>
                            ))}
                        </div>
                    ))}
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