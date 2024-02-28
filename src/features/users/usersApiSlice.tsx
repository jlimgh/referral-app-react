import {
    createSelector,
    createEntityAdapter,
    EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { UserProps } from "../../models/UserProps";
import { RootState } from "../../app/store";
  
const usersAdapter = createEntityAdapter<any>({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => '/users',
      // removed validateStatus. to handle HTTP status validation, could use the baseQuery configuration's validateStatus function.
      keepUnusedDataFor: 5,
      transformResponse: (responseData: UserProps[]): any => {
        const loadedUsers = responseData.map((user: UserProps) => {
          user.id = user._id;
          return user;
        })

        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result: any) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'User' as const, id })),
          ];
        } else return [{ type: 'User', id: 'LIST' }];
      },
    }),
  })
});

export const {
  useGetUsersQuery,
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data ?? initialState// normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state: RootState) => selectUsersData(state) as EntityState<any, any>);