import React, { useContext } from 'react';
import { Form, Input } from 'antd';

import style from '../../App.module.css';
import { Context } from '../../context';


const SearchInput = () => {
    const { handleDebounce } = useContext(Context);
    const onChange = (e) => {
        handleDebounce(e.name);
    };

    const [form] = Form.useForm();
    return (
        <>
        <Form form={form}   layout="vertical" 
                            autoComplete="off" 
                            onValuesChange={onChange}
                            className={style.search__input} >
            <Form.Item name="name">
            <Input placeholder='Type to search...' />
            </Form.Item>
        </Form>
        </>
    );
};
export default SearchInput;

