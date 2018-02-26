import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
describe("LoadingSpinnerComponent", () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatProgressSpinnerModule],
        declarations: [LoadingSpinnerComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should initialyze", () => {
    expect(component.diameter).toEqual(300);
  });
});
