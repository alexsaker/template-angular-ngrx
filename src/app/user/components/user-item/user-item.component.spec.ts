import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { UserItemComponent } from "./user-item.component";
import DataMockUsers from "../../../../../mock/mock-data/mock-users";

describe("UserItemComponent", () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatCardModule, MatIconModule],
        declarations: [UserItemComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    component.user = DataMockUsers[0];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
