import { reducer } from './layout.reducer';
import * as fromLayout from './layout.reducer';
import * as layoutActions from '../actions/layout.actions';
import { Action } from '@ngrx/store';


describe('LayoutReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const action = {} as any;

            const result = reducer(undefined, action);
            expect(result).toEqual(fromLayout.initialState);
        });
    });

    describe('TOGGLE_SIDENAV_MENU action', () => {
        it('should set sidenavMenuOpened to false in layout state', () => {
            const toggleSidenavMenuAction = new layoutActions.ToggleSidenavMenuAction();
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            const expectedResult = {
                sidenavMenuOpened: false,
                sidenavFormOpened: false,
                theme: "cyan-theme"
            };


            const result = reducer(fromLayout.initialState, toggleSidenavMenuAction);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('OPEN_SIDENAV_MENU action', () => {
        it('should set sidenavMenuOpened to true in layout state', () => {
            const openSidenavMenuAction = new layoutActions.OpenSidenavMenuAction();
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            const expectedResult = {
                sidenavMenuOpened: true,
                sidenavFormOpened: false,
                theme: "cyan-theme"
            };


            const result = reducer(fromLayout.initialState, openSidenavMenuAction);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('CLOSE_SIDENAV_MENU action', () => {
        it('should set sidenavMenuOpened to false in layout state', () => {
            const closeSidenavMenuAction = new layoutActions.CloseSidenavMenuAction();
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            const expectedResult = {
                sidenavMenuOpened: false,
                sidenavFormOpened: false,
                theme: "cyan-theme"
            };


            const result = reducer(fromLayout.initialState, closeSidenavMenuAction);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('TOGGLE_SIDENAV_FORM action', () => {
        it('should set sidenavFormOpened to false in layout state', () => {
            const toggleSidenavFormAction = new layoutActions.ToggleSidenavFormAction();
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            const expectedResult = {
                sidenavMenuOpened: true,
                sidenavFormOpened: true,
                theme: "cyan-theme"
            };


            const result = reducer(fromLayout.initialState, toggleSidenavFormAction);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('OPEN_SIDENAV_FORM action', () => {
        it('should set sidenavFormOpened to true in layout state', () => {
            const openSidenavFormAction = new layoutActions.OpenSidenavFormAction();
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            const expectedResult = {
                sidenavMenuOpened: true,
                sidenavFormOpened: true,
                theme: "cyan-theme"
            };


            const result = reducer(fromLayout.initialState, openSidenavFormAction);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('CLOSE_SIDENAV_FORM action', () => {
        it('should set sidenavFormOpened to false in layout state', () => {
            const closeSidenavFormAction = new layoutActions.CloseSidenavFormAction();
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            const expectedResult = {
                sidenavMenuOpened: true,
                sidenavFormOpened: false,
                theme: "cyan-theme"
            };


            const result = reducer(fromLayout.initialState, closeSidenavFormAction);
            expect(result).toEqual(expectedResult);
        });
    });


    describe('SELECT_THEME action', () => {
        it('should set theme to specified theme in layout state', () => {
            const selectThemeAction = new layoutActions.SelectThemeAction('myTheme');
            spyOn(Storage.prototype, 'getItem').and.callFake(() => undefined);
            spyOn(Storage.prototype, 'setItem').and.callFake(() => true);
            const expectedResult = {
                sidenavMenuOpened: true,
                sidenavFormOpened: false,
                theme: "myTheme"
            };


            const result = reducer(fromLayout.initialState, selectThemeAction);
            expect(result).toEqual(expectedResult);
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'myTheme');
        });
    });

});
