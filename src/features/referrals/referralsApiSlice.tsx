import {
    createSelector,
    createEntityAdapter,
    EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { ReferralProps } from "../../models/ReferralProps";
import { RootState } from "../../app/store";
  
const referralsAdapter = createEntityAdapter<any>({
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});


const initialState = referralsAdapter.getInitialState();

export const referralsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      getReferrals: builder.query<any, any>({
        query: () => ({
          url: '/referrals',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
      }),
      // removed validateStatus. to handle HTTP status validation, could use the baseQuery configuration's validateStatus function.
      transformResponse: (responseData: ReferralProps[]): any => {
        const loadedReferrals = responseData.map((referral: ReferralProps) => {
          referral.id = referral._id;
          return referral;
        })

        return referralsAdapter.setAll(initialState, loadedReferrals);
      },
      providesTags: (result: any) => {
        if (result?.ids) {
          return [
            { type: 'Referral', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'Referral', id })),
          ];
        } else return [{ type: 'Referral', id: 'LIST' }];
      },
    }),
    addNewReferral: builder.mutation({
      query: initialReferralData => ({
        url: '/referrals',
        method: 'POST',
        body: {
          ...initialReferralData
        }
      }),
      invalidatesTags: [
        { type: 'Referral', id: 'LIST'}
      ]
    }),
    updateReferral: builder.mutation({
      query: initialReferralData => ({
        url: '/referrals',
        method: 'PATCH',
        body: {
          ...initialReferralData
        }
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Referral', id: arg.id }
      ]
    }),
    deleteReferral: builder.mutation({
      query: ({ id }) => ({
        url: '/referrals',
        method: 'DELETE',
        body: {
          id
        }
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Referral', id: arg.id }
      ]
    })
  }),
});

export const {
  useGetReferralsQuery,
  useAddNewReferralMutation,
  useUpdateReferralMutation,
  useDeleteReferralMutation
} = referralsApiSlice;

// returns the query result object
export const selectReferralsResult = referralsApiSlice.endpoints.getReferrals.select({});

// creates memoized selector
const selectReferralsData = createSelector(
  selectReferralsResult,
  (referralsResult) => referralsResult.data ?? initialState// normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllReferrals,
  selectById: selectReferralById,
  selectIds: selectReferralIds,
  // Pass in a selector that returns the referrals slice of state
} = referralsAdapter.getSelectors((state: RootState) => selectReferralsData(state) as EntityState<any, any>);