import { get,post } from '../utils/request';
import qs from 'qs';
import axios from 'axios';

const getUserUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getusername";
// const getTableUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getTableList";

export async function getUserNameReq() {
    let data = await get(getUserUrl)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}

export async function getTableListReq(param) {
    let data = await get(`/getdata?${qs.stringify(param)}`)
        .then((res) => res)
        .catch(err => console.log(err));
    return data;
}

export async function addReq(param) {
    let data = await axios.post(`/add`,param)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}

export async function editReq(param) {
    let data = await post('/edit',param)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}

export async function removeOneReq(param) {
    let data = await post('/remove',param)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}

export async function removeManyReq(param) {
    let data = await post('/removeMany',param)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}
