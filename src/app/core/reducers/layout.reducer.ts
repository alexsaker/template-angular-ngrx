import * as LayoutActions from '../actions/layout.actions';

export interface State {
  sidenavMenuOpened: boolean;
  sidenavFormOpened: boolean;
  theme: string;
}

export const initialState: State  = {
  sidenavMenuOpened: true,
  sidenavFormOpened: false,
  theme: localStorage.getItem("theme") || "cyan-theme"
};

export function reducer(state = initialState, action: LayoutActions.Actions): State {
  switch (action.type) {
    case LayoutActions.TOGGLE_SIDENAV_MENU:
      return {
        ...state,
        sidenavMenuOpened: !(state.sidenavMenuOpened)
      };
    case LayoutActions.OPEN_SIDENAV_MENU:
      return {
        ...state,
        sidenavMenuOpened: true
      };
    case LayoutActions.CLOSE_SIDENAV_MENU:
      return {
        ...state,
        sidenavMenuOpened: false
      };
    case LayoutActions.TOGGLE_SIDENAV_FORM:
      return {
        ...state,
        sidenavFormOpened: !(state.sidenavFormOpened)
      };
    case LayoutActions.OPEN_SIDENAV_FORM:
      return {
        ...state,
        sidenavFormOpened: true
      };
    case LayoutActions.CLOSE_SIDENAV_FORM:
      return {
        ...state,
        sidenavFormOpened: false
      };

    case LayoutActions.SELECT_THEME:
      localStorage.setItem("theme", action.payload);
      return {
        ...state,
        theme: action.payload
      };

    default:
      return state;
  }
}

export const getSidenavMenuOpened = (state: State) => state.sidenavMenuOpened;
export const getSidenavFormOpened = (state: State) => state.sidenavFormOpened;
export const getTheme = (state: State) => state.theme;

