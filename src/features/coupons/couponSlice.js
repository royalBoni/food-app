import { apiSlice } from "../api/apiSlice"

export const extendedApiCouponSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
      
        fetchMyCoupon: builder.mutation({
            query: ({code}) => ({
                url: `/coupon/${code}`,
                method: 'GET',
            
            })
        }),
  })
})

export const {
    useFetchMyCouponMutation
}=extendedApiCouponSlice
