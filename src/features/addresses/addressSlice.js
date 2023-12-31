import {createSelector,createEntityAdapter} from "@reduxjs/toolkit"; 
import { apiSlice } from "../api/apiSlice"

const userAddressAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const allAddressAdapter = createEntityAdapter({
    selectId:(e)=>e.customerId
})

const userInitialState = userAddressAdapter.getInitialState() 

const allInitialState = allAddressAdapter.getInitialState()

export const extendedApiAddressesSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
      getUserAddress : builder.query({
            query:()=> `address/${(JSON.parse(localStorage.getItem("myUserId"))).id}`,
            transformResponse: responseData=>{
                const loadedPosts= (responseData.data)?.map(post=>{
            
                    return post;
                });
                return userAddressAdapter.setAll(userInitialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }), 


        getAllAddress : builder.query({
            query:()=> `address/admin/${(JSON.parse(localStorage.getItem("myAdminData"))).id}`,
            transformResponse: responseData=>{
                const loadedPosts= (responseData.data)?.map(post=>{
            
                    return post;
                });
                return allAddressAdapter.setAll(allInitialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }), 

      
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
export const selectAddressResult = extendedApiAddressesSlice.endpoints.getUserAddress.select()


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
} = userAddressAdapter.getSelectors(state => selectAddressData(state)?? userInitialState)



// returns the query result object
export const selectAllAddressResult = extendedApiAddressesSlice.endpoints.getAllAddress.select()


//creates memoized selector
const selectAllAddressData =createSelector(
    selectAllAddressResult,
    allResult=> allResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAdminAllAdresss,
    selectById: selectAdressAdminById
    // Pass in a selector that returns the posts slice of state
} = allAddressAdapter.getSelectors(state => selectAllAddressData(state)?? allInitialState)