import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"

const transactionAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const transactionByUserAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})



const initialState = transactionAdapter.getInitialState()

export const extendedApiTransactionSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getTransactions : builder.query({
            
            query:()=> `/transaction/${(JSON.parse(localStorage.getItem("myAdminData"))).id}`,
            transformResponse: responseData=>{
                const loadedCarts= responseData.data?.map(post=>{
            
                    return post;
                });
                return transactionAdapter.setAll(initialState, loadedCarts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Trannsaction', id: "LIST"},
                ...result.ids.map(id=>({type:'Transaction',id}))
            ]
        }),


        getTransactionsByUser : builder.query({
            
            query:()=> `/transaction/customer/${(JSON.parse(localStorage.getItem("myUserId"))).id}`,
            transformResponse: responseData=>{
                const loadedCarts= responseData.data?.map(post=>{
            
                    return post;
                });
                return transactionByUserAdapter.setAll(initialState, loadedCarts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Trannsaction', id: "LIST"},
                ...result.ids.map(id=>({type:'Transaction',id}))
            ]
        }),


        addNewTransaction: builder.mutation({
            query: initialPost => ({
                url: '/transaction',
                method: 'POST',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: [
                { type: 'Transaction', id: "LIST" }
            ]
        }),

        getTransactionByUserId: builder.mutation({
            query:({customerId}) => ({
                url:  `/transaction/customer/${customerId}`,
                method: 'GET'
            }),
            invalidatesTags: [
                { type: 'Transaction', id: "LIST" }
            ]
        }),

        /* updateCart: builder.mutation({
            query: initialPost => ({
                url: `/order/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                    up : !initialPost.up
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        }), */

       /*  deleteCart: builder.mutation({
            query: ({orderId,userId})=> ({
                url: `/order/${orderId}/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        }), */

       /*  addReaction: builder.mutation({
            query: ({ orderId, quantity }) => ({
                url: `/order/${orderId}`,
                method: 'PUT',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { quantity }
            }),
            async onQueryStarted({ orderId, quantity }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiTransactionSlice.util.updateQueryData('getTransactions', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[orderId]
                        if (post) post.quantity = quantity
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }) */
  

  })
})

export const {
    useGetTransactionsQuery,
    useAddNewTransactionMutation,
    useGetTransactionByUserIdMutation
}=extendedApiTransactionSlice

// returns the query result object
export const selectTransactionsResult = extendedApiTransactionSlice.endpoints.getTransactions.select()


//creates memoized selector
const selectTransactionsData =createSelector(
    selectTransactionsResult,
    transactionsResult=> transactionsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTransactions,
    selectById: selectTransactionById,
    selectIds: selectTransactionIds,
    /* selectAllById=selectTransactionsResult?.filter((item)=>item.customerId===myId.id) */
    // Pass in a selector that returns the posts slice of state
} = transactionAdapter.getSelectors(state => selectTransactionsData(state)?? initialState)


// returns the query result object
export const selectTransactionsByUserResult = extendedApiTransactionSlice.endpoints.getTransactionsByUser.select()


//creates memoized selector
const selectTransactionsByUserData =createSelector(
    selectTransactionsByUserResult,
    transactionsResult=> transactionsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTransactionsByUser,
    /* selectAllById=selectTransactionsResult?.filter((item)=>item.customerId===myId.id) */
    // Pass in a selector that returns the posts slice of state
} = transactionByUserAdapter.getSelectors(state => selectTransactionsByUserData(state)?? initialState)



