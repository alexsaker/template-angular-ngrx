import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromAuth from "../../reducers";
import * as UserActions from "../../actions/user.actions";
@Component({
  selector: "temp-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnInit {
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}
  getSubmittedForm(formData) {
    this.store.dispatch(new UserActions.Login(formData));
  }
}
