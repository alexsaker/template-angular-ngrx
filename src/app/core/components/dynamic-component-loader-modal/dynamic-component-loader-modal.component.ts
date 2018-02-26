import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  ComponentFactoryResolver,
  ChangeDetectionStrategy
} from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import "rxjs/add/observable/combineLatest";
import { Observable } from "rxjs/Observable";
import { SnackbarErrorsComponent } from "../snackbar-errors/snackbar-errors.component";

@Component({
  selector: "temp-dynamic-component-loader-modal",
  templateUrl: "./dynamic-component-loader-modal.component.html",
  styleUrls: ["./dynamic-component-loader-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicComponentLoaderModalComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  private snackBarRef: any;
  scrollbarConfig: Object;
  dynamicComponentData: any;
  isSubmitButtonDisabled: boolean;
  errors: any[];
  changeSubscription: Subscription;
  submitButtonDisabledSubscription: Subscription;
  errorsAndToastSubscription: Subscription;

  @ViewChild("dynamicComponentContainer", { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;
  constructor(
    public dialogRef: MatDialogRef<DynamicComponentLoaderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dynamicComponentData = null;
    this.isSubmitButtonDisabled = true;
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  private loadComponent() {
    if (this.data.component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.data.component
      );
      const componentRef = this.dynamicComponentContainer.createComponent(
        componentFactory
      );
      componentRef.instance["inputs"] = this.data.inputs || {};
      if (componentRef.instance["change"]) {
        this.changeSubscription = componentRef.instance["change"].subscribe(
          data => {
            if (data === null) {
              this.dialogRef.close(null);
            }
            this.dynamicComponentData = data;
          }
        );
      }
      if (componentRef.instance["submitButtonDisabled"]) {
        this.submitButtonDisabledSubscription = componentRef.instance[
          "submitButtonDisabled"
        ].subscribe(isSubmitButtonDisabled => {
          this.isSubmitButtonDisabled = isSubmitButtonDisabled;
        });
      }
      if (componentRef.instance["errors"]) {
        this.errorsAndToastSubscription = componentRef.instance[
          "errors"
        ].subscribe(emittedErrors => {
          if (emittedErrors) {
            this.snackBarRef = this.snackBar.openFromComponent(
              SnackbarErrorsComponent,
              {
                data: {
                  title: emittedErrors["title"] ? emittedErrors["title"] : "",
                  errors: emittedErrors["errors"]
                },
                panelClass: "snack-bar-error"
              }
            );
            this.snackBarRef.instance.snackbarErrorsComponent = this.snackBarRef;
          }
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
    if (this.submitButtonDisabledSubscription) {
      this.submitButtonDisabledSubscription.unsubscribe();
    }
    if (this.errorsAndToastSubscription) {
      this.errorsAndToastSubscription.unsubscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.dynamicComponentData);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
