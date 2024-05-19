import ApiService from './ApiService'

// export async function apiGetSalesCompanies<
//     T,
//     U extends Record<string, unknown>,
// >(params: U) {
//     return ApiService.fetchData<T>({
//         url: 'http://localhost:8000/api/companies',
//         method: 'get',
//         params,
//     })
// }

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
        url: 'http://localhost:8000/api/documentsp/',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesDocuments<
    T,
    U extends { id: number },
>(data: U) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/documents/${data.id}/`,
        method: 'delete',
        data,
    })
}

export async function apiGetSalesDocument<T, U extends { id: number }>(
    params: U,
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/documents/${params.id}/`,
        method: 'get',
        params,
    })
}

export async function apiPutSalesDocument<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `http://localhost:8000/api/documents/${data.id}/`,
        method: 'put',
        data,
    })
}

export async function apiCreateSalesDocument<T, U extends FormData>(data: U) {
    return ApiService.fetchData<T>({
        url: 'http://localhost:8000/api/documents/',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data,
    })
}

