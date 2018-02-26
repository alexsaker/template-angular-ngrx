import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as UserActions from "../../../authentication/actions/user.actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "temp-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
  role: string;
  userEmail: string;
  isMenuClosed: boolean;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isMenuClosed = true;
  }

  logout() {
    this.store.dispatch(new UserActions.Logout());
  }
}
