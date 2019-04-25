import request from './request';

export function getTest() {
    return request({
        url: 'get_script_info/',
        method: 'get',
        // params: query
    })
}

