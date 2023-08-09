import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"

const transactionAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const transactionByUserAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})



const initialState = transactionAdapter.getInitialState()
const intialUserState=transactionByUserAdapter.getInitialState()

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
                return transactionByUserAdapter.setAll(intialUserState, loadedCarts)
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

        updateTransaction: builder.mutation({
            query:initialPost => ({
                url:  `/transaction/${(JSON.parse(localStorage.getItem("myAdminData"))).id}`,
                method: 'PUT',
                body: initialPost
            }),
            invalidatesTags: [
                { type: 'Transaction', id: "LIST" }
            ]
        })

  })
})

export const {
    useGetTransactionsQuery,
    useAddNewTransactionMutation,
    useGetTransactionByUserIdMutation,
    useUpdateTransactionMutation
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
} = transactionByUserAdapter.getSelectors(state => selectTransactionsByUserData(state)?? intialUserState)



