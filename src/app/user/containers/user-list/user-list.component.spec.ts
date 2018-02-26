import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule, Store, Action } from "@ngrx/store";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CoreModule } from "../../../core/core.module";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { UserItemComponent } from "../../components/user-item/user-item.component";
import { UserListComponent } from "./user-list.component";
import { LoadingSpinnerComponent } from "../../../core/components/loading-spinner/loading-spinner.component";

import DataMockUsers from "../../../../../mock/mock-data/mock-users";

describe("UserListComponent", () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: Store<any>;
  const storeInitialState: Object = {
    users: {
      ids: DataMockUsers.map(user => user.id),
      entities: DataMockUsers.reduce((acc, current) => {
        acc[current["id"]] = current;
        return acc;
      }, {})
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule],
        declarations: [UserListComponent, UserItemComponent],
        providers: [
          { provide: Store, useValue: new MockStore(storeInitialState) }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
