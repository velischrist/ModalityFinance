import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

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
import { salesFakeApi, authFakeApi, knowledgeBaseFakeApi } from './fakeApi'
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
            authFakeApi(this, apiPrefix)
        },
    })
}
