import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"

const cartsAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const myId= JSON.parse(localStorage.getItem("myUserId"));

const initialState = cartsAdapter.getInitialState()

export const extendedApiCartsSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getCarts : builder.query({
            query:()=> `/order/${myId?.id}`,
            transformResponse: responseData=>{
                const loadedCarts= responseData.data?.map(post=>{
            
                    return post;
                });
                return cartsAdapter.setAll(initialState, loadedCarts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Cart', id: "LIST"},
                ...result.ids.map(id=>({type:'Cart',id}))
            ]
        }),


        addNewCart: builder.mutation({
            query: initialPost => ({
                url: '/order',
                method: 'POST',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: [
                { type: 'Cart', id: "LIST" }
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

        deleteCart: builder.mutation({
            query: ({orderId,userId})=> ({
                url: `/order/${orderId}/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        }),

        addReaction: builder.mutation({
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
                    extendedApiCartsSlice.util.updateQueryData('getCarts', undefined, draft => {
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
        })
  

  })
})

export const {
    useGetCartsQuery,
    useAddNewCartMutation,
    useDeleteCartMutation,
    useAddReactionMutation
}=extendedApiCartsSlice

// returns the query result object
export const selectCartsResult = extendedApiCartsSlice.endpoints.getCarts.select()


//creates memoized selector
const selectCartsData =createSelector(
    selectCartsResult,
    cartsResult=> cartsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCarts,
    selectById: selectCartById,
    selectIds: selectCartIds,
    /* selectAllById=selectCartsResult?.filter((item)=>item.customerId===myId.id) */
    // Pass in a selector that returns the posts slice of state
} = cartsAdapter.getSelectors(state => selectCartsData(state)?? initialState)


