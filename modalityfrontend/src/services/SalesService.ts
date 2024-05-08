import ApiService from './ApiService'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>,
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

export async function apiGetSalesCompanies<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/companies',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesCompanies<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/companies/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesCompany<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: '/sales/company',
        method: 'get',
        params,
    })
}

export async function apiPutSalesCompany<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/sales/companies/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesCompany<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/companies/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiGetSalesDocuments<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/documents',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesDocuments<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/documents/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesDocument<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: '/sales/document',
        method: 'get',
        params,
    })
}

export async function apiPutSalesDocument<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/sales/documents/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesDocument<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/documents/create',
        method: 'post',
        data,
    })
}
