import React from 'react';
import PropTypes from 'prop-types';
import { Button, ConfigProvider, Flex } from 'antd';

import style from './Header.module.css';


export const Header = ({searched, handleClickRated, handleClickSearched}) => {

  return (
    <div className={style.header}>
      <ConfigProvider
        theme={
            {
              token: {
                borderRadius: 0
              }
            }
          }
      >
        <Flex gap="small" wrap="nowrap">
          <Button type="button" className={searched === true ? style.focus : style.tab__button} onClick={handleClickSearched}>Search</Button>
          <Button type="button" className={!searched ? style.focus : style.tab__button} onClick={handleClickRated}>Rated</Button>
        </Flex>
      </ConfigProvider>
      
    </div>
  );
};

Header.propTypes = {
  searched: PropTypes.bool,
  handleClickRated: PropTypes.func,
  handleClickSearched: PropTypes.func
};