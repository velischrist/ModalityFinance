import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'
import { eventsData, mailData, crmDashboardData } from './data/crmData'
import { signInUserData } from './data/authData'

import {
    companiesData,
    documentsData,
    ordersData,
    orderDetailsData,
} from './data/salesData'
import {
    helpCenterCategoriesData,
    helpCenterArticleListData,
} from './data/knowledgeBaseData'
import {
    salesFakeApi,
    authFakeApi,
    knowledgeBaseFakeApi,
    crmFakeApi,
} from './fakeApi'
// import { notificationListData, searchQueryPoolData } from './data/commonData'

const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                companiesData,
                documentsData,
                ordersData,
                orderDetailsData,
                helpCenterCategoriesData,
                helpCenterArticleListData,
                eventsData,
                mailData,
                crmDashboardData,
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                const isResource = request.url.startsWith('data:text')
                return isExternal || isResource
            })
            this.passthrough()
            salesFakeApi(this, apiPrefix)
            knowledgeBaseFakeApi(this, apiPrefix)
            crmFakeApi(this, apiPrefix)
            authFakeApi(this, apiPrefix)
        },
    })
}
