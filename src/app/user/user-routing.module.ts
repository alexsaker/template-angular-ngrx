import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule
} from "@angular/material";
import { CoreModule } from "../core/core.module";

import { LoggedInGuard } from "../authentication/guards/logged-in.guard";

import { UserListComponent } from "./containers/user-list/user-list.component";
import { UserDetailsComponent } from "./containers/user-details/user-details.component";
import { UserItemComponent } from "./components/user-item/user-item.component";
import { PostItemComponent } from "./components/post-item/post-item.component";

export const COMPONENTS = [
  UserListComponent,
  UserDetailsComponent,
  UserItemComponent,
  PostItemComponent
];
export const EXPORTS = [...COMPONENTS];

export const MODULES = [CoreModule, CommonModule];

export const PROVIDERS = [];

@NgModule({
  imports: MODULES,
  declarations: COMPONENTS,
  exports: EXPORTS,
  providers: PROVIDERS,
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUserRoutingModule,
      providers: PROVIDERS
    };
  }
}

const routes = [
  {
    path: "users",
    canActivate: [LoggedInGuard],
    children: [
      {
        path: "",
        component: UserListComponent
      },
      {
        path: ":userId",
        component: UserDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    UserRoutingModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([])
  ],
  exports: EXPORTS
})
export class RootUserRoutingModule {}
