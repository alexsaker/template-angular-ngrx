import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppRootComponent } from "./app-root.component";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import {
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatExpansionModule,
  MatIconModule
} from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";

import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { SidenavMenuComponent } from "../../components/sidenav-menu/sidenav-menu.component";
import { CoreLayoutComponent } from "../../components/core-layout/core-layout.component";
import { ThemeMenuComponent } from "../../../core/components/theme-menu/theme-menu.component";
import { UserMenuComponent } from "../../components/user-menu/user-menu.component";
describe("AppRootComponent", () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture<AppRootComponent>;
  const storeInitialState: Object = {
    layout: {
      sidenavMenuOpened: true,
      sidenavFormOpened: true
    },
    authentication: {
      user: {
        token: null,
        error: false
      }
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MatIconModule,
          MatInputModule,
          MatFormFieldModule,
          MatToolbarModule,
          MatMenuModule,
          MatButtonModule,
          MatExpansionModule
        ],
        declarations: [
          AppRootComponent,
          ToolbarComponent,
          SidenavMenuComponent,
          CoreLayoutComponent,
          ThemeMenuComponent,
          UserMenuComponent
        ],
        providers: [
          { provide: Store, useValue: new MockStore(storeInitialState) }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
