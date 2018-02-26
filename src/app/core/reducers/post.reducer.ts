import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import * as PostActions from "../actions/post.actions";
import { Post } from "../models/post.models";
import { Toast } from "../models/toast.models";

export interface State extends EntityState<Post> {
  loading: boolean;
  loaded: boolean;
  error: any;
  toast: Toast | null;
}

export function sortByTitle(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id,
  sortComparer: sortByTitle
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  toast: null,
});

export function reducer(
  state = initialState,
  action: PostActions.Actions
): State {
  switch (action.type) {
    case PostActions.GETALL:
      return {
        ...state,
        loaded: false,
        loading: true
      };

    case PostActions.GETALL_SUCCESS:
      return adapter.addMany(action.payload.posts, {
        ...state,
        error: null,
        loading: false,
        loaded: true
      });

    case PostActions.GETALL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case PostActions.GET:
      return {
        ...state,
        loaded: false,
        loading: true
      };

    case PostActions.GET_SUCCESS:
      return adapter.addOne(action.payload.post, {
        ...state,
        error: null,
        loaded: true,
        loading: false
      });
    case PostActions.GET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        toast: { type: "error", action: "GET_FAILURE" }
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

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
