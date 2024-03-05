/* eslint-disable no-undef */
export const getData = async(URL) => {
    const data = await fetch(URL, {
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_API_AUTHORIZATION
        }
    });
    const response = await data.json();
    return data.ok && response;
};

export const setRated = async(URL, rate) => {
    await fetch(URL, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: process.env.REACT_APP_API_AUTHORIZATION
        },
        body: `{"value":${JSON.stringify(rate)}}`
    }).then(response => response.json()).catch(err => console.error(err));
};