import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  AfterViewInit
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Router, NavigationEnd } from "@angular/router";
import * as fromRoot from "../../../reducers";
import * as UserActions from "../../actions/user.actions";
import { User } from "../../models/user.models";
import * as fromAuth from "../../../authentication/reducers";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "temp-sidenav-menu",
  templateUrl: "./sidenav-menu.component.html",
  styleUrls: ["./sidenav-menu.component.scss"]
})
export class SidenavMenuComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() opened: boolean;
  scrollbarConfig: Object;
  isSidenavMenuOpened: Observable<boolean>;
  users: Observable<User[]>;
  isViewPanelOpen: boolean;

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit() {
    this.isViewPanelOpen = true;
    this.isSidenavMenuOpened = this.store.select(fromRoot.getSidenavMenuOpened);
    this.users = this.store.select(fromRoot.getAllUsers);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
  }

  goToUser(user) {
    this.store.dispatch(new UserActions.Select(user["id"]));
    this.router.navigate([`/users/${user["id"]}`]);
  }
}
