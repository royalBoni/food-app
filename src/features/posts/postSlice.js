import {createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"

const postsAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
        getPosts : builder.query({
            query:()=> '/dishes',
            transformResponse: responseData=>{
                const loadedPosts= (responseData.data).map(post=>{
            
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }),

        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),

        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/dishes`,
                method: 'PUT',
                body: initialPost/* {
                    ...initialPost,
                    date: new Date().toISOString()
                } */
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        deletePost: builder.mutation({
            query: ({dishID,adminID}) => ({
                url: `/dishes/${dishID}/${adminID}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

  })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
}=extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

//creates memoized selector
const selectPostsData =createSelector(
    selectPostsResult,
    postsResult=> postsResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDishes,
    selectById: selectDishById,
    selectIds: selectDishIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => selectPostsData(state)?? initialState)


