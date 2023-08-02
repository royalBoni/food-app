import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"

const reviewsAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = reviewsAdapter.getInitialState()

export const extendedApiReviewSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getReviews : builder.query({
            query:()=> '/reviews',
            transformResponse: responseData=>{
                const loadedReviews= responseData.data.map(reviews=>{
            
                    return reviews;
                });
                return reviewsAdapter.setAll(initialState, loadedReviews)
            },
            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),


        addNewReview: builder.mutation({
            query: initialPost => ({
                url: '/reviews',
                method: 'POST',
                body: {...initialPost}
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        fetchReviewByUserId: builder.mutation({
            query: initialPost => ({
                url: `/reviews/${initialPost.userId}`,
                method: 'GET'
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

  })
})

export const {
    useGetReviewsQuery,
    useAddNewReviewMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useFetchReviewByUserIdMutation
}=extendedApiReviewSlice

// returns the query result object
export const selectPostsResult = extendedApiReviewSlice.endpoints.getReviews.select()


//creates memoized selector
const selectPostsData =createSelector(
    selectPostsResult,
    postsResult=> postsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById
    // Pass in a selector that returns the posts slice of state
} = reviewsAdapter.getSelectors(state => selectPostsData(state)?? initialState)


