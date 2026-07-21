import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

export default function Modal({ show, onClose, movieId }) {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (show && movieId) {
            const fetchDetails = async () => {
                try {
                    const { data } = await axios.get(
                        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
                    );
                    setMovieDetails(data);
                } catch (error) {
                    console.error("Failed to fetch movie details", error);
                }
            };
            fetchDetails();
        }
    }, [show, movieId]);
    if (!show) return null;

    return (
        <Container>
            <div className="overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    <AiOutlineClose />
                </button>
                {movieDetails ? (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                            alt={movieDetails.title}
                            className="modal-backdrop"
                        />
                        <div className="info">
                            <h2>{movieDetails.title || movieDetails.name}</h2>
                            <p className="rating">
                                Rating: {Math.round(movieDetails.vote_average * 10)}% Match
                            </p>
                            <p className="overview">{movieDetails.overview}</p>
                            <div className="genres">{movieDetails.genres?.map(g => (
                                <span key={g.id}>{g.name}</span>
                            ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="loading">Loading...</div>
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay {
    position: absolute;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .modal-content {
    position: relative;
    width: 600px;
    max-width: 90%;
    background-color: #181818;
    border-radius: 10px;
    overflow: hidden;
    color: white;
    box-shadow: 0px 10px 30px rgba(0,0,0,0.8);
    z-index: 1001;
    .close-btn {
      position: absolute;
      top: 15px; right: 15px;
      background: #181818;
      border: none;
      color: white;
      font-size: 1.5rem;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;
    }
    .modal-backdrop {
      width: 100%;
      height: 300px;
      object-fit: cover;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
    }
    .info {
      padding: 2rem;
      margin-top: -50px; /* Pull text up over the faded image */
      position: relative;
      h2 { font-size: 2.5rem; margin-bottom: 1rem; }
      .rating { color: #46d369; font-weight: bold; margin-bottom: 1rem; }
      .overview { font-size: 1.1rem; line-height: 1.5; color: #d2d2d2; }
      .genres {
        margin-top: 1.5rem;
        display: flex; gap: 10px;
        span { padding: 5px 10px; background: #333; border-radius: 4px; font-size: 0.9rem;}
      }
    }
    
    .loading { padding: 3rem; text-align: center; }
  }
`;