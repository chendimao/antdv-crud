import http from '../util/http.js';

export const web_alterationApply_getByList = function (params) {
    return http.post({url: '/getPhysicians', params})
}
// 文件
export const ywwjPageList = function (params) {
    return http.post({url: '/web/ywwj/ywwjPageList', params})
}

// 定期总结
export const summaryPageList = function (params) {
    return http.post({url: '/disput/summaryPageList', params})
}

// Copy的代码作参考
// 保存都是post
export const web_archivesManagement_getManagement_details = function (params) {
    return http.post({url: '/web/archivesManagement/getManagement/details', params})
}



export const web_alterationApply_insertOrUpdate = function (params) {
    return http.post( {url: '/web/alterationApply/insertOrUpdate', params})
}

export const web_archivesManagement_getByGb25 = function (params) {
    return http.post( {url: '/web/archivesManagement/getByGb25', params})
}
export const web_archivesManagement_getByGb147 = function (params) {
    return http.post( {url: '/web/archivesManagement/getByGb147', params})
}