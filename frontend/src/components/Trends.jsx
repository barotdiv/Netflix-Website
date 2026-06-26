import trend1 from "../assets/trend1.webp";
import trend2 from "../assets/trend2.webp";
import trend3 from "../assets/trend3.webp";
import trend4 from "../assets/trend4.webp";

function Trends() {
    const movies = [
        {
            id: 1,
            url: trend1,
        },
        {
            id: 2,
            url: trend2,
        },
        {
            id: 3,
            url: trend3,
        },
        {
            id: 4,
            url: trend4,
        },
        {
            id: 5,
            url: trend1,
        },
        {
            id: 6,
            url: trend2,
        },
        {
            id: 7,
            url: trend3,
        },
        {
            id: 8,
            url: trend4,
        },
    ];
    return (
        <div className="py-10">
            <div className="font-bold text-2xl">Trending now</div>
            <div className="flex gap-10 overflow-scroll hide-scrollbar">
                {movies.map((movie, index) => {
                    return (
                        <div key={index} className="pt-5 relative">
                            <img className="rounded-2xl min-w-[150px]" src={movie.url} alt="" />
                            <div className="text-9xl font-bold absolute bottom-0 left-[-25px] text-stroke-white">
                                {movie.id}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Trends;