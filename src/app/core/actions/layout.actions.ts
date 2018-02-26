import { Action } from '@ngrx/store';

export const TOGGLE_SIDENAV_MENU = '[Layout] Toggle Sidenav Menu';
export const OPEN_SIDENAV_MENU = '[Layout] Open Sidenav Menu';
export const CLOSE_SIDENAV_MENU = '[Layout] Close Sidenav Menu';
export const TOGGLE_SIDENAV_FORM = '[Layout] Toggle Sidenav Form';
export const OPEN_SIDENAV_FORM = '[Layout] Open Sidenav Form';
export const CLOSE_SIDENAV_FORM = '[Layout] Close Sidenav Form';
export const SELECT_THEME = '[Layout] Select Theme';


export class ToggleSidenavMenuAction implements Action {
  readonly type = TOGGLE_SIDENAV_MENU;
}
export class OpenSidenavMenuAction implements Action {
  readonly type = OPEN_SIDENAV_MENU;
}
export class CloseSidenavMenuAction implements Action {
  readonly type = CLOSE_SIDENAV_MENU;
}


export class ToggleSidenavFormAction implements Action {
  readonly type = TOGGLE_SIDENAV_FORM;
}
export class OpenSidenavFormAction implements Action {
  readonly type = OPEN_SIDENAV_FORM;
}
export class CloseSidenavFormAction implements Action {
  readonly type = CLOSE_SIDENAV_FORM;
}

export class SelectThemeAction implements Action {
  readonly type = SELECT_THEME;
  constructor(public payload: string) { }
}


export type Actions =
  |ToggleSidenavMenuAction
  | OpenSidenavMenuAction
  | CloseSidenavMenuAction
  | ToggleSidenavFormAction
  | OpenSidenavFormAction
  | CloseSidenavFormAction
  | SelectThemeAction;
