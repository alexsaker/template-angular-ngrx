import { Observable } from "rxjs/Observable";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as LayoutActions from "../../../core/actions/layout.actions";
import * as fromAuth from "../../../authentication/reducers";
@Component({
  selector: "temp-app-root",
  templateUrl: "./app-root.component.html",
  styleUrls: ["./app-root.component.scss"]
})
export class AppRootComponent implements OnInit {
  showSidenav: Observable<boolean>;
  loggedIn: Observable<boolean>;
  theme: string;

  constructor(
    private store: Store<fromRoot.State>,
    public overlayContainer: OverlayContainer
  ) {}

  ngOnInit() {
    this.store.select(fromRoot.getTheme).subscribe(theme => {
      this.theme = theme;
      this.overlayContainer.getContainerElement().classList.add(theme);
    });
    this.loggedIn = this.store.select(fromAuth.getIsUserLoggedIn);
  }

  toggleMenu(event) {
    this.store.dispatch(new LayoutActions.ToggleSidenavMenuAction());
  }
}
