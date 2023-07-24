import {createSelector,createEntityAdapter} from "@reduxjs/toolkit"; 
import { apiSlice } from "../api/apiSlice"

const profileAdapter = createEntityAdapter({
    selectId:(e)=>e._id
})

const initialState = profileAdapter.getInitialState() 

export const extendedApiProfileSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
      getAllProfiles : builder.query({
            query:()=> `profile/`,
            transformResponse: responseData=>{
                const loadedPosts= (responseData.data)?.map(post=>{
            
                    return post;
                });
                return profileAdapter.setAll(initialState, loadedPosts)
            },

            providesTags:(result, error, arg) =>[
                {type: 'Post', id: "LIST"},
                ...result.ids.map(id=>({type:'Post',id}))
            ]
        }), 

     /*  getProfileByUserId: builder.query({
            query: ({customerId}) => `/profile/${customerId}`,
            transformResponse: responseData => {
                const loadedPosts = (responseData.data)?.map(post => {
                    return post;
                });
                return profileAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }), */


        getProfileByUserId: builder.mutation({
            query:({customerId}) => ({
                url:  `/profile/${customerId}`,
                method: 'GET'
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

       /*  loginCustomer: builder.query({
            query: ({email, password}) => `/customers/?email=${email}&password=${password}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    return post;
                });
                return profileAdapter.setAll(initialState, loadedPosts)
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

        addNewProfile: builder.mutation({
            query: initialPost => ({
                url: '/profile',
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

       updateCustomer: builder.mutation({
            query: initialPost => ({
                url: `/profile`,
                method: 'PUT',
                body: initialPost
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        
        deleteProfile: builder.mutation({
            query: ({ profileId,customerId }) => ({
                url: `/profile/${profileId}/${customerId}`,
                method: 'DELETE',
                body: { profileId,customerId }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

  })
})

export const {
    useAddNewProfileMutation,
    useDeleteProfileMutation,
    useUpdateCustomerMutation,
    useGetProfileByUserIdMutation
}=extendedApiProfileSlice

// returns the query result object
export const selectProfileResult = extendedApiProfileSlice.endpoints.getAllProfiles.select()


//creates memoized selector
const selectProfileData =createSelector(
    selectProfileResult,
    profileResult=> profileResult.data  //normalize state objects with ids and entities
)


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProfile,
    selectById: selectProfileById,
    selectIds: selectProfileIds
    // Pass in a selector that returns the posts slice of state
} = profileAdapter.getSelectors(state => selectProfileData(state)?? initialState)
