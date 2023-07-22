import {createSelector,createEntityAdapter} from "@reduxjs/toolkit"; 
import { apiSlice } from "../api/apiSlice"

const addressesAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = addressesAdapter.getInitialState() 

export const extendedApiAddressesSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
      getAddress : builder.query({
            query:()=> `address/${(JSON.parse(localStorage.getItem("myUserId"))).id}`,
            transformResponse: responseData=>{
                const loadedPosts= (responseData.data)?.map(post=>{
            
                    return post;
                });
                return addressesAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }), 

      /*  getAddressByUserId: builder.query({
            query: customerId => `/address/${customerId}`,
            transformResponse: responseData => {
                const loadedPosts = (responseData.data)?.map(post => {
                    return post;
                });
                return addressesAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
 */
       /*  loginCustomer: builder.query({
            query: ({email, password}) => `/customers/?email=${email}&password=${password}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    return post;
                });
                return addressesAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }), */

       /*  loginCustomer: builder.query({
            query: ({email, password}) => ({
                url: '/customers',
                method: 'POST',
                body:{email,password}
            })
        }), */

        addNewAddress: builder.mutation({
            query: initialPost => ({
                url: '/address',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

       /*  loginCustomer: builder.mutation({
            query:({email,password}) => ({
                url: '/customers/login',
                method: 'POST',
                body: {email,password}
                
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }), */

        updateAddress: builder.mutation({
            query: initialPost => ({
                url: `/address`,
                method: 'PUT',
                body: initialPost
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        
        deleteAddress: builder.mutation({
            query: ({ addressId,customerId }) => ({
                url: `/address/${addressId}/${customerId}`,
                method: 'DELETE',
                body: { addressId,customerId }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

  })
})

export const {
    useAddNewAddressMutation,
    useDeleteAddressMutation,
    useUpdateAddressMutation
}=extendedApiAddressesSlice

// returns the query result object
export const selectAddressResult = extendedApiAddressesSlice.endpoints.getAddress.select()


//creates memoized selector
const selectAddressData =createSelector(
    selectAddressResult,
    customersResult=> customersResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAdresss,
    selectById: selectAdressById,
    selectIds: selectAdressIds
    // Pass in a selector that returns the posts slice of state
} = addressesAdapter.getSelectors(state => selectAddressData(state)?? initialState)
