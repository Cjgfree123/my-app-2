import { get } from '../utils/request';
import qs from 'qs';

const getUserUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getusername";
// const getTableUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getTableList";

export async function getUserNameReq() {
    let data = await get(getUserUrl)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}

export async function getTableListReq(param) {
    let data = await get(`http://localhost:8016/getdata?${qs.stringify(param)}`)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}
