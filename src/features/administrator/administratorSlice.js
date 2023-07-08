import { apiSlice } from "../api/apiSlice"

export const extendedApiAdministratorSlice=apiSlice.injectEndpoints({
    endpoints: builder=>({
     
        addNewAdministrator: builder.mutation({
            query: initialPost => ({
                url: '/admin',
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

        loginAdministrator: builder.mutation({
            query:({email,password}) => ({
                url: '/admin/login',
                method: 'POST',
                body: {email,password}
                
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

       /*  updateCustomer: builder.mutation({
            query: initialPost => ({
                url: `/customers/${initialPost.id}`,
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
    useAddNewAdministratorMutation,
    useLoginAdministratorMutation
}=extendedApiAdministratorSlice

