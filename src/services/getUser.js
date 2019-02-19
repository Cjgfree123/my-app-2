import { get } from '../utils/request';

const getUserUrl = "https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getusername";

export async function getUserNameReq() {
    let data = await get(getUserUrl)
        .then((res) => res.data)
        .catch(err => console.log(err));
    return data;
}
