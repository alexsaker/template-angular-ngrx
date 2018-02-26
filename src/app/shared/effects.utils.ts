import { Effect, Actions } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { Router, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { of } from 'rxjs/observable/of';

export class ErrorUtils {
    static extractError(error: any): any {
        let outputError;
        try {
            outputError = error.json();
            outputError['status'] = error['status'];
        } catch (e) {
            outputError = {
                name: error.name || 'Error',
                message: error.message || 'Unknown Error'
            };
        }
        return outputError;
    }
}

