import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ROOT as string,
    prepareHeaders: headers => {
        const jwt = localStorage.jwt;
        if (jwt) {
            headers.set('Authorization', `${jwt}`)
        }
        return headers;
    }
    }),
    endpoints: () => ({}),
})