import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { MAT_SNACK_BAR_DATA } from "@angular/material";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
@Component({
  selector: "temp-snackbar-errors",
  templateUrl: "./snackbar-errors.component.html",
  styleUrls: ["./snackbar-errors.component.scss"]
})
export class SnackbarErrorsComponent implements OnInit, OnDestroy {
  errors: any[];
  title: string;
  snackbarErrorsComponent: any;
  constructor(
    private store: Store<fromRoot.State>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit() {
    this.errors = this.data.errors;
    this.title = this.data.title;
  }

  dismissSnackbar() {
    this.snackbarErrorsComponent.dismiss();
  }
  ngOnDestroy() {
    this.snackbarErrorsComponent = null;
  }
}
