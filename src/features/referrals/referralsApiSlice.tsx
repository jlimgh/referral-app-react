import {
    createSelector,
    createEntityAdapter,
    EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Referral } from "../../models/Referral";
import { RootState } from "../../app/store";
  
const referralsAdapter = createEntityAdapter<any>({});

const initialState = referralsAdapter.getInitialState();

export const referralsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReferrals: builder.query<any, void>({
      query: () => '/referrals',
      // removed validateStatus. to handle HTTP status validation, could use the baseQuery configuration's validateStatus function.
      keepUnusedDataFor: 5,
      transformResponse: (responseData: any[]): any => {
        const loadedReferrals = responseData.map((referral: Referral) => {
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
  }),
});

export const {
  useGetReferralsQuery,
} = referralsApiSlice;

// returns the query result object
export const selectReferralsResult = referralsApiSlice.endpoints.getReferrals.select();

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