import ApiService from './ApiService'

export async function apiGetSalesCompanies<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8000/api/companiesp/',
        method: 'post',
        data,
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
