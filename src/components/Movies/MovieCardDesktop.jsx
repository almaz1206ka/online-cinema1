import React from 'react';
import PropTypes from 'prop-types';

import { APIS } from '../../api/apis';
import { MovieInfo } from '../MovieCard/MovieInfo';
import { MovieCardImg } from '../MovieCard/MovieCardImg';
import { OtherInfo } from '../MovieCard/MovieOtherInfo';

import style from './Movies.module.css';

export const MovieCardDesktop = ({ movie, rateChange }) => {
  const { id, title, poster_path: poster, release_date: date, overview, genre_ids, vote_average: vote } = movie;
  return (
    <li className={style.movie__card}>
      <MovieCardImg poster={poster} src={APIS.IMAGE_URL_DESKTOP} title={title} />
      <div className={style.card__info__desktop}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MovieInfo id={id} title={title} date={date} overview={overview} genre_ids={genre_ids} vote={vote} />
          <span
            className={style.rate}
            style={{
              borderColor: `${typeof vote === 'number' ? (vote > 7 ? '#66E900' : vote > 5 ? '#E9D100' : vote > 3 ? '#E97E00' : '#E90000') : null}`,
            }}
          >
            {vote && vote.toFixed(1)}
          </span>
        </div>
        <OtherInfo movie={movie} rateChange={rateChange} />
      </div>
    </li>
  );
};

MovieCardDesktop.propTypes = {
  movie: PropTypes.object,
  rateChange: PropTypes.func,
};
