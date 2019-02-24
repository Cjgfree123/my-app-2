import { get } from '../utils/request';

const getUserUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getusername";
const getTableUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getTableList";

export async function getUserNameReq() {
    let data = await get(getUserUrl)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}

export async function getTableListReq() {
    let data = await get(getTableUrl)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}
