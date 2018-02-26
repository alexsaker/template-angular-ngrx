import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import * as UserActions from "../actions/user.actions";
import { User } from "../models/user.models";
import { Toast } from "../models/toast.models";

export interface State extends EntityState<User> {
  loading: boolean;
  loaded: boolean;
  error: any;
  toast: Toast | null;
  selected: number | null;
}

export function sortByName(a: User, b: User): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: sortByName
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  toast: null,
  selected: null
});

export function reducer(
  state = initialState,
  action: UserActions.Actions
): State {
  switch (action.type) {
    case UserActions.GETALL:
      return {
        ...state,
        loaded: false,
        loading: true
      };

    case UserActions.GETALL_SUCCESS:
      return adapter.addMany(action.payload.users, {
        ...state,
        error: null,
        loading: false,
        loaded: true
      });

    case UserActions.GETALL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case UserActions.GET:
      return {
        ...state,
        loaded: false,
        loading: true
      };

    case UserActions.GET_SUCCESS:
      return adapter.addOne(action.payload.user, {
        ...state,
        error: null,
        loaded: true,
        loading: false
      });
    case UserActions.GET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        toast: { type: "error", action: "GET_FAILURE" }
      };
    case UserActions.SELECT:
      return {
        ...state,
        selected: action.payload
      };

    default: {
      return state;
    }
  }
}

export const getAll = (state: State) => {
  if (state.entities) {
    return Object.keys(state.entities).map(key => state.entities[key]);
  }
  return [];
};
export const getEntities = (state: State) => state.entities;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
export const getSelected = (state: State) => state.selected;
