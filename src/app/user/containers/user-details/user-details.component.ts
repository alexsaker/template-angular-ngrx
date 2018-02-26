import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import * as fromRoot from "../../../reducers";
import { User } from "../../../core/models/user.models";
import { Post } from "../../../core/models/post.models";

@Component({
  selector: "temp-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {
  posts: Observable<any[]>;
  loading: Observable<boolean>;
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.loading = this.store.select(fromRoot.getPostsLoading);
    this.posts = this.store.select(fromRoot.getPostsPerUser);
  }
  goToUsersPage() {
    this.router.navigate(["/users"]);
  }
}
