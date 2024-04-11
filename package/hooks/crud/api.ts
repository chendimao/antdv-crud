import { isNumber } from "../../utils/is";
import qs from "qs";

export enum Api {
    web_archivesManagement_getByGb03 = '/web/archivesManagement/getByGb03', // 民族下拉
    web_archivesManagement_getByGb09 = '/web/archivesManagement/getByGb09', // 最高学历下拉
    web_archivesManagement_getByGb10 = '/web/archivesManagement/getByGb10', // 学位下拉
    web_archivesManagement_getByGb11 = '/web/archivesManagement/getByGb11', // 职称下拉
    web_archivesManagement_getByGb147 = '/web/archivesManagement/getByGb147', // 人员类别下拉
    web_archivesManagement_getByGb25 = '/web/archivesManagement/getByGb25', // 科室下拉
    roleGetPageList = '/web/role/getPageList', // 角色下拉
    GetAccountPageList = '/web/plan/getByAdmin', // 所有人员下拉
    web_activity_adminList = '/web/activity/adminList', // 所有人员下拉
    web_consultationManagement_ysxl = '/web/consultationManagement/ysxl',// 根据科室查询医生
    web_archivesManagement_getByGb45 = '/web/archivesManagement/getByGb45', // 医师执业类别下拉
    web_archivesManagement_getByGb47 = '/web/archivesManagement/getByGb47',//医师执业范围下拉
    web_archivesManagement_getByGb146 = '/web/archivesManagement/getByGb146', //人员大分类下拉
    web_archivesManagement_getByGb12 = '/web/archivesManagement/getByGb12' //技术职务下拉
}