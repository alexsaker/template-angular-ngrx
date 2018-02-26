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

import { LoggedInGuard } from "./guards/logged-in.guard";
import { UserEffects } from "./effects/user.effects";
import { UserService } from "./services/user.service";

import { reducers } from "./reducers";

import { LoginFormComponent } from "./components/login-form/login-form.component";
import { UserLoginComponent } from "./containers/user-login/user-login.component";

export const COMPONENTS = [UserLoginComponent, LoginFormComponent];
export const EXPORTS = [...COMPONENTS];

export const MODULES = [
  CoreModule,
  CommonModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule
];

export const PROVIDERS = [UserService, LoggedInGuard];

@NgModule({
  imports: MODULES,
  declarations: COMPONENTS,
  exports: EXPORTS,
  providers: PROVIDERS,
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthenticationRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthenticationRoutingModule,
      providers: PROVIDERS
    };
  }
}

const routes = [
  {
    path: "authentication",
    children: [
      {
        path: "user",
        children: [
          {
            path: "login",
            component: UserLoginComponent,
            canActivate: []
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("authentication", reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: EXPORTS
})
export class RootAuthenticationRoutingModule {}
