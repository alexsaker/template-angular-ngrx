import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StoreModule, Store, Action } from "@ngrx/store";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CoreModule } from "../../../core/core.module";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { UserDetailsComponent } from "./user-details.component";
import { PostItemComponent } from "../../components/post-item/post-item.component";
import { of } from "rxjs/observable/of";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import DataMockUsers from "../../../../../mock/mock-data/mock-users";
import DataMockPosts from "../../../../../mock/mock-data/mock-posts";

describe("UserDetailsComponent", () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: Store<any>;
  const router = {
    navigate: jasmine.createSpy("navigate"),
    events: of()
  };
  const storeInitialState: Object = {
    users: {
      ids: DataMockUsers.map(user => user.id),
      entities: DataMockUsers.reduce((acc, current) => {
        acc[current["id"]] = current;
        return acc;
      }, {}),
      loading: false
    },
    posts: {
      ids: DataMockPosts.map(post => post.id),
      entities: DataMockPosts.reduce((acc, current) => {
        acc[current["id"]] = current;
        return acc;
      }, {}),
      loading: false
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, RouterTestingModule],
        declarations: [UserDetailsComponent, PostItemComponent],
        providers: [
          { provide: Store, useValue: new MockStore(storeInitialState) },
          { provide: Router, useValue: router }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should go back to users page", () => {
    component.goToUsersPage();
    expect(router.navigate).toHaveBeenCalledWith(["/users"]);
  });
});
