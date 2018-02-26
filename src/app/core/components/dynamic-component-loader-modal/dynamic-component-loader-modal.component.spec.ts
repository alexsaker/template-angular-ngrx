import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import {
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Component
} from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { By } from "@angular/platform-browser";

import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSelectModule,
  MatAutocompleteModule,
  MatSlideToggleModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { OverlayModule, OverlayRef } from "@angular/cdk/overlay";
import { TransferState } from "@angular/platform-browser/src/browser/transfer_state";
import { Observable } from "rxjs/Observable";
import { DynamicComponentLoaderModalComponent } from "./dynamic-component-loader-modal.component";
import { Subscription } from "rxjs/Subscription";


const emittedChange = { test: 2 };
@Component({
  selector: "temp-dynamically-loaded-fake",
  template: `
  <div id="actions">
    <button id="button1" (click)='emitChange()'>Test1 Button</button>
  </div>
  <div>
    <button  id="button2" (click)='emitSubmitButtonDisabled()'>Test2 Button</button>
  </div>
  `
})
class DynamicallyLoadedFakeComponent {
  @Input() inputs: any;
  @Output() change = new EventEmitter<any>();
  @Output() submitButtonDisabled = new EventEmitter<boolean>();

  emitChange() {
    this.change.emit(emittedChange);
  }
  emitSubmitButtonDisabled() {
    this.submitButtonDisabled.emit(false);
  }
}

describe("DynamicComponentLoaderModalComponent", () => {
  let component: DynamicComponentLoaderModalComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<DynamicComponentLoaderModalComponent>;
  let fixtureDynamicallyLoaded: ComponentFixture<
    DynamicallyLoadedFakeComponent
  >;
  let elementDynamicallyLoaded: DebugElement;
  let dialogRef: any;

  const dialogData = {
    component: DynamicallyLoadedFakeComponent,
    title: "MyTitle",
    inputs: {}
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatSnackBarModule,
          MatDialogModule,

          BrowserAnimationsModule
        ],
        providers: [
          {
            provide: MatDialogRef,
            useValue: jasmine.createSpyObj("MatDialogRef", ["close"])
          },
          { provide: MAT_DIALOG_DATA, useValue: dialogData }
        ],
        declarations: [
          DynamicComponentLoaderModalComponent,
          DynamicallyLoadedFakeComponent
        ]
      })
        .overrideModule(BrowserDynamicTestingModule, {
          set: {
            entryComponents: [
              DynamicComponentLoaderModalComponent,
              DynamicallyLoadedFakeComponent
            ]
          }
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    dialogRef = TestBed.get(MatDialogRef);
    fixture = TestBed.createComponent(DynamicComponentLoaderModalComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixtureDynamicallyLoaded = TestBed.createComponent(
      DynamicallyLoadedFakeComponent
    );
    elementDynamicallyLoaded = fixtureDynamicallyLoaded.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize", () => {
    expect(component.dynamicComponentData).toEqual(null);
    expect(component.isSubmitButtonDisabled).toEqual(true);
    expect(component.changeSubscription instanceof Subscription).toBeTruthy();
    expect(
      component.submitButtonDisabledSubscription instanceof Subscription
    ).toBeTruthy();
  });

  it("should have component loaded dynamically", () => {
    const inputEl = elementDynamicallyLoaded.query(By.css("#actions"));
    expect(inputEl).toBeDefined();
  });

  // TODO: Make test work
  xit(
    "should set data to dynamicComponentData",
    fakeAsync(() => {
      const inputEl = elementDynamicallyLoaded.query(By.css("#button1"));
      inputEl.triggerEventHandler("click", null);
      tick();
      expect(component.dynamicComponentData).toEqual(emittedChange);
    })
  );

  // TODO: Make test work
  xit("should set boolean value to isSubmitButtonDisabled", () => {
    const inputEl = elementDynamicallyLoaded.query(By.css("#button2"));
    inputEl.triggerEventHandler("click", null);
    tick();
    expect(component.isSubmitButtonDisabled).toBeFalsy();
  });

  it("should remove subscriptions on ngDestroy", () => {
    component.ngOnDestroy();
    expect(component.changeSubscription.closed).toBeTruthy();
    expect(component.submitButtonDisabledSubscription.closed).toBeTruthy();
  });

  it(
    "should submit data",
    fakeAsync(() => {
      component.dynamicComponentData = emittedChange;
      component.submit();
      expect(dialogRef.close).toHaveBeenCalledWith(emittedChange);
    })
  );
});
