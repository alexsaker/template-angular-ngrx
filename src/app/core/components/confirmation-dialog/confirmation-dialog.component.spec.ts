import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs/observable/of";
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { CoreModule } from "../../../core/core.module";
import { Observable } from "rxjs/Observable";
import { transformMenu } from "@angular/material/menu/typings/menu-animations";
import { TransferState } from "@angular/platform-browser/src/browser/transfer_state";

describe("ConfirmationDialogComponent", () => {
  let component: ConfirmationDialogComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  const dialogData = {
    title: "MyTitle",
    text: "MyText",
    extra: "MyExtra"
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatDialogModule, BrowserAnimationsModule],
        providers: [
          {
            provide: MatDialogRef,
            useValue: jasmine.createSpyObj("dialogRef", ["close"])
          },
          { provide: MAT_DIALOG_DATA, useValue: dialogData }
        ],
        declarations: [ConfirmationDialogComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set title", () => {
    const title = element.query(By.css("h2"));
    expect(title.nativeElement.textContent).toContain("Confirmation");
  });

  it("should set content", () => {
    const content = element.query(By.css("mat-dialog-content"));
    expect(content.nativeElement.textContent).toContain("Are you sure ?");
  });
});
