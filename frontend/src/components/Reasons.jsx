import { LuMonitorPlay } from "react-icons/lu";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { GiWatchtower } from "react-icons/gi";
import { RiStarSmileLine } from "react-icons/ri";

function Reasons() {
    const reasons = [
        {
            title: "Enjoy on your TV",
            detail:
                "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            icon: <LuMonitorPlay />,
        },
        {
            title: "Download your series to watch offline",
            detail:
                "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            icon: <FaCloudDownloadAlt />,
        },
        {
            title: "Watch everywhere",
            detail:
                "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            icon: <GiWatchtower />,
        },
        {
            title: "Create profiles for children",
            detail:
                "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            icon: <RiStarSmileLine />,
        },
    ];
    return (
        <div className="mt-5">
            <div className="font-bold text-2xl mb-5">More reasons to join</div>

            <div className=" flex gap-5">
                {reasons.map((reason, index) => {
                    return (
                        <div className="w-[300px] h-[320px] rounded-2xl p-5 bg-gradient-to-b from-blue-950 to-gray-900 relative ">
                            <div className="font-bold text-[22px]">{reason.title}</div>
                            <div className="py-5 text-gray-400 text-[16px]">{reason.detail}</div>
                            <div className="text-7xl right-0 mr-10 absolute opacity-60 bottom-0 mb-5">
                                {reason.icon}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Reasons;