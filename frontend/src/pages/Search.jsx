import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../store";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import NotAvailable from "../components/NotAvailable";

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [isScrolled, setIsScrolled] = useState(false);

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    useEffect(() => {
        if (query) {
            dispatch(searchMovies(query));
        }
    }, [query, dispatch]);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="content">
                <h1>Search Results for "{query}"</h1>
                <div className="grid flex">
                    {movies && movies.length ? (
                        movies.map((movie, index) => {
                            return <Card movieData={movie} index={index} key={movie.id} />;
                        })
                    ) : (
                        <NotAvailable />
                    )}
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
  background-color: black;
  min-height: 100vh;
  .content {
    padding: 8rem;
    h1 {
        margin-bottom: 3rem;
        color: white;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;