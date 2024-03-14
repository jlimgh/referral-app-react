import { apiSlice } from "../../app/api/apiSlice"

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewSignupEmail: builder.mutation({
          query: signupEmailData => ({
              url: '/signup',
              method: 'POST',
              body: {
                  ...signupEmailData,
              }
          })
      }),
    })
})

export const {
    useAddNewSignupEmailMutation,
} = publicApiSlice 