import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Link } from "react-router"

const tmdbToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN || "YOUR_TOKEN_HERE"

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbToken}`
    },
}

const CardList = ({ title, category }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then((res) => res.json())
            .then((res) => setData(res.results || []))
            .catch((err) => console.error(err));
    }, [category]);

    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
            <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwipper">{(data || []).map((item, index) => (
                <SwiperSlide key={index} className="max-w-72">
                    <Link to={`/movie/${item.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                            alt=""
                            className="h-44 w-full object-center object-cover"
                        />
                        <p className="text-center pt-2">{item.original_title}</p>
                    </Link>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
}

export default CardList