import ApiService from './ApiService'

export async function apiGetSalesCompanies<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8000/api/companies',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesCompanies<
    T,
    U extends { companyid: number },
>(data: U) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/companies/${data.companyid}/`,
        method: 'delete',
    })
}

export async function apiGetSalesCompany<T, U extends { companyid: number }>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/companies/${params.companyid}/`,
        method: 'get',
        params,
    })
}

export async function apiPutSalesCompany<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/companies/${data.companyid}/`,
        method: 'put',
        data,
    })
}

export async function apiCreateSalesCompany<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8000/api/companies/',
        method: 'post',
        data,
    })
}

export async function apiGetSalesDocuments<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8000/api/documents/',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesDocuments<
    T,
    U extends { documentid: number },
>(data: U) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/documents/${data.documentid}/`,
        method: 'delete',
        data,
    })
}

export async function apiGetSalesDocument<T, U extends { documentid: number }>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/documents/${params.documentid}/`,
        method: 'get',
        params,
    })
}

export async function apiPutSalesDocument<T, U extends { documentid: number }>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/documents/${data.documentid}/`,
        method: 'put',
        data,
    })
}

export async function apiCreateSalesDocument<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8000/api/documents/',
        method: 'post',
        data,
    })
}
