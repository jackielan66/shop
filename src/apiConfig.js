/**
 * 接口api 配置
 */
import axios from 'axios';
export const WWW = `http://sanrenxi.com`;
export const URI = 'http://test.sanrenxi.com';
export const uid = ` ` || `1fb004b2cbe54c0b92bcab3cb58ad9c3`;
export const getToken = ()=>{
    return window.localStorage.getItem('uid')
}



