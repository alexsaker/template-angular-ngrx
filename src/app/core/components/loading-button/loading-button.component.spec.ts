import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { LoadingButtonComponent } from "./loading-button.component";

describe("LoadingButtonComponent", () => {
  let component: LoadingButtonComponent;
  let fixture: ComponentFixture<LoadingButtonComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatProgressSpinnerModule],
        declarations: [LoadingButtonComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialyze", () => {
    expect(component.loading).toBeFalsy();
    expect(component.diameter).toEqual(30);
    expect(component.text).toEqual("NO TEXT");
    expect(component.disabled).toBeTruthy();
  });

  it("should emit action", () => {
    spyOn(component.action, "emit");
    component.doAction();
    expect(component.action.emit).toHaveBeenCalledWith(true);
  });
});
