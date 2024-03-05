/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import style from '../App.module.css';
import { useResize } from '../hooks/useResize';
import { Context } from '../context';
import { APIS } from '../api/apis';
import { getData, setRated } from '../api/request';

import SearchInput from './SearchInput/SearchInput';
import { Header } from './Header/Header';
import { Movies } from './Movies/Movies';

const MovieContainer = () => {

  const { width } = useResize();

  const [isLoading, setIsLoading] = useState(true);

  const [searched, setSearched] = useState(false);

  const [page, setPage] = useState({
    search: 1,
    rated: 1
  });

  const [value, setValue] = useState('');

  const [searchedMovie, setSearchedMovie] = useState({});

  const [ratedMovie, setRatedMovie] = useState({});

  const [genres, setGenres] = useState();

  const [rate, setRate] = useState({
    rate: null,
    ratedID: null
  });
  
  const API_SEARCH = APIS.API_SEARCH + encodeURI(value) + APIS.API_SEARCH_OPTIONS + page.search;
  const API_SET_RATE = APIS.API_RATED.replace('{movie_id}', rate.ratedID);
  const API_RATED = APIS.API_RATED_LIST + page.rated;

  const handleChange = (value) => {
    setValue(value);
  };

  const debounce = (fn, ms) => {
    let timeout;
    return (args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(args), ms);
    };
};

  const handleDebounce = debounce(handleChange, 1000);

  const handleClickRated = () => {
    setSearched(false);
  };

  const handleClickSearched = () => {
    setSearched(true);
  };

  const handleRateChange = (value, id) => {
    setRate({
      rate: value,
      ratedID: id
    });
  };
  
    useEffect(() => {
    value && getData(API_SEARCH)
      .then(setIsLoading(true))
      .then(res => {
      setSearchedMovie(res);
      setIsLoading(false);
    }).catch(console.error);
    
    rate.ratedID && setRated(API_SET_RATE, rate.rate);

    const timeout = setTimeout(() => getData(API_RATED).then(res => {
      setRatedMovie(res);
      setIsLoading(false);
    }).catch(err => console.error(err)), 500);

    return () => clearTimeout(timeout);

  }, [value, page.search, page.rated, rate.rate]);

  useEffect(() => {
    getData(APIS.API_GENRES).then(res => setGenres(res.genres)).catch(console.error);
  }, []);

  return (
    <Context.Provider
      value={{
        handleDebounce,
        handleRateChange,
        genres
      }}
    >
      <div className={style.task__container}>
        <Header searched={searched}
                handleClickRated={handleClickRated} 
                handleClickSearched={handleClickSearched} />
        {searched && <SearchInput />}
        <div className={style.main}>
          {isLoading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={
                    width < 720
                      ? { fontSize: 50, marginTop: 50, marginLeft: 30 }
                      : width > 720 && width < 1011
                        ? { fontSize: 50, marginTop: 50, marginLeft: 450 }
                        : { fontSize: 50, marginTop: 50, marginLeft: 450 }
                  }
                />
              }
            />
          ) : <Movies searched={searched}
                      ratedMovie={ratedMovie?.results}
                      searchedMovie={searchedMovie?.results}
                      value={value}
                      rateChange={handleRateChange}
          />}
        </div>
        {searched
          ? (value !== '' && !isLoading && searchedMovie?.results?.length > 0) && (
              <Pagination
                current={page.search}
                showSizeChanger={false}
                total={searchedMovie?.total_pages}
                onChange={(e) => setPage({search: e, rated: page.rated})}
                style={{ marginTop: 10 }}
              />
            )
          : (ratedMovie?.results?.length > 0 && !isLoading) && (
              <Pagination
                current={page.rated}
                showSizeChanger={false}
                total={ratedMovie?.total_pages}
                onChange={(e) => setPage({search: page.search, rated: e})}
                style={{ marginTop: 10 }}
              />
            )}
      </div>
    </Context.Provider>
  );
};

export default MovieContainer;
