import request from '@/utils/request'
export function getList(query:any) {
    return request({
        url: '/getList',
        method: 'get',
        params:query
    })
}