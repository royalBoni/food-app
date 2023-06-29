import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',  //optional
    /* baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3030'}), */ 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}), //https://food-api-x4wn.onrender.com
    tagTypes: ['Post'],
    endpoints: builder =>({})
})


