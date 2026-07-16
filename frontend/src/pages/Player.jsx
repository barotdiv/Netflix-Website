import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import video from "../assets/video.mp4";

export default function Player() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
        );
        const trailer = data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else if (data.results.length > 0) {
          // Fallback to any available video if no specific "Trailer" exists
          setTrailerKey(data.results[0].key);
        }
      } catch (error) {
        console.error("Failed to fetch trailer", error);
      }
    };
    fetchTrailer();
  }, [id]);

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {trailerKey ? (
          <iframe src={`https://www.youtube.com/embed/${trailerKey} ? autoplay=1&controls=0&modestbranding=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">allowFullScreen</iframe>
        ) : (
          <div className="no-video">
            <h1>Trailer Not Available</h1>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    background-color: black;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
        color: white;
      }
    }
    iframe {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .no-video {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
  }
`;