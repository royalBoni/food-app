import {createSelector,createEntityAdapter} from "@reduxjs/toolkit"; 
import { apiSlice } from "../api/apiSlice"

const customersAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = customersAdapter.getInitialState() 

export const extendedApiCustomerSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
      getCustomers : builder.query({
            query:()=> `customers/${(JSON.parse(localStorage.getItem("myAdminData"))).id}`,
            transformResponse: responseData=>{
                const loadedPosts= (responseData.data)?.map(post=>{
            
                    return post;
                });
                return customersAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        addNewCustomer: builder.mutation({
            query: initialPost => ({
                url: '/customers',
                method: 'POST',
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        loginCustomer: builder.mutation({
            query:({email,password}) => ({
                url: '/customers/login',
                method: 'POST',
                body: {email,password}
                
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

         updateCustomerPassword: builder.mutation({
            query: ({currentPassword,newPassword,customerId}) => ({
                url: `/customers`,
                method: 'PUT',
                body:{currentPassword,newPassword,customerId}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        /*

        deleteCustomer: builder.mutation({
            query: ({ id }) => ({
                url: `/customer/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
 */
  })
})

export const {
    useUpdateCustomerPasswordMutation,
    useAddNewCustomerMutation,
    useLoginCustomerMutation
}=extendedApiCustomerSlice

// returns the query result object
export const selectCustomersResult = extendedApiCustomerSlice.endpoints.getCustomers.select()


//creates memoized selector
const selectCustomersData =createSelector(
    selectCustomersResult,
    customersResult=> customersResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectCustomerIds
    // Pass in a selector that returns the posts slice of state
} = customersAdapter.getSelectors(state => selectCustomersData(state)?? initialState)
