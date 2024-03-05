import React from 'react';
import PropTypes from 'prop-types';

import { useResize } from '../../hooks/useResize';

import { MovieCardDesktop } from './MovieCardDesktop';
import { MovieCardMobile } from './MovieCardMobile';

export const Movies = ({searched, ratedMovie, searchedMovie, rateChange}) => {
    const { width } = useResize();
    return (
        <>
        {
            searched === false ? (
                ratedMovie && ratedMovie.map(movie => {
                    return width <= 720 ? (
                        <MovieCardMobile key={movie.id} movie={movie} rateChange={rateChange} />
                    ) : (
                        <MovieCardDesktop key={movie.id} movie={movie} rateChange={rateChange} />
                    );
                })
            ) : (
                searchedMovie && searchedMovie.map(movie => {
                    return width <= 720 ? (
                        <MovieCardMobile key={movie.id} movie={movie} rateChange={rateChange} />
                    ) : (
                        <MovieCardDesktop key={movie.id} movie={movie} rateChange={rateChange} />
                    );
                })
            )
        }
        </>
    );
};

Movies.ropTypes = {
    searched: PropTypes.bool,
    ratedMovie: PropTypes.array,
    searchedMovie: PropTypes.array,
    rateChange: PropTypes.func
};
