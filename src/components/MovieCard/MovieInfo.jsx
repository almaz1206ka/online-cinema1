import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import { Context } from '../../context';

import style from './CardInfo.module.css';

export const MovieInfo = ({ title, date, genre_ids }) => {
  const { genres } = useContext(Context);

  const genresData = {};

  genres.forEach((genre) => (genresData[genre.id] = genre.name));

  date = dateFormat(date, 'mmmm d, yyyy');

  return (
    <div className={style.card__info}>
      <h5>{title}</h5>
      <p style={{ color: 'rgba(130, 126, 126, 1)' }}>{date.length > 0 ? date : 'Дата неизвестна'}</p>
      {
        <span style={{ width: 210 }}>
          {genre_ids.map((id) => (
            <span className={style.genre} key={id}>
              {id ? genresData[id] : 'Неизвестный жанр'}
            </span>
          ))}
        </span>
      }
    </div>
  );
};

MovieInfo.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  genre_ids: PropTypes.array,
};
