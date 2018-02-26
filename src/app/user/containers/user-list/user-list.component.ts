import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "../../../reducers";
import { User } from "../../../core/models/user.models";
@Component({
  selector: "temp-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  loading: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {}
  ngOnInit() {
    this.loading = this.store.select(fromRoot.getUsersLoading);
    this.users = this.store.select(fromRoot.getAllUsers);
  }
}
