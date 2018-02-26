import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import { ThemeMenuComponent } from "../theme-menu/theme-menu.component";
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { ToolbarComponent } from "./toolbar.component";
import { CoreModule } from "../../core.module";

describe("ToolbarComponent", () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  const storeInitialState: Object = {
    layout: {
      sidenavMenuOpened: true
    },
    authentication: {
      user: {
        error: null,
        loading: false,
        token: null
      }
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ToolbarComponent, ThemeMenuComponent, UserMenuComponent],
        imports: [
          MatMenuModule,
          MatButtonModule,
          HttpClientModule,
          MatToolbarModule,
          MatIconModule
        ],
        providers: [
          { provide: Store, useValue: new MockStore(storeInitialState) }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
