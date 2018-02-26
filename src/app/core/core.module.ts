import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Http, RequestOptions } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";

import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { UserService } from "./services/user.service";
import { PostService } from "./services/post.service";

import { AppRootComponent } from "./containers/app-root/app-root.component";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { CoreLayoutComponent } from "./components/core-layout/core-layout.component";
import { SidenavMenuComponent } from "./components/sidenav-menu/sidenav-menu.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { ThemeMenuComponent } from "./components/theme-menu/theme-menu.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { DynamicComponentLoaderModalComponent } from "./components/dynamic-component-loader-modal/dynamic-component-loader-modal.component";
import { LoadingButtonComponent } from "./components/loading-button/loading-button.component";
import { SnackbarErrorsComponent } from "./components/snackbar-errors/snackbar-errors.component";
import { UserMenuComponent } from "./components/user-menu/user-menu.component";

import { AddCommasPipe, EllipsisPipe } from "./pipes";


export const PIPES = [AddCommasPipe, EllipsisPipe];

export const COMPONENTS = [
  AppRootComponent,
  PageNotFoundComponent,
  CoreLayoutComponent,
  SidenavMenuComponent,
  ToolbarComponent,
  LoadingSpinnerComponent,
  ThemeMenuComponent,
  SearchInputComponent,
  ConfirmationDialogComponent,
  DynamicComponentLoaderModalComponent,
  LoadingButtonComponent,
  SnackbarErrorsComponent,
  UserMenuComponent
];

export const DECLARATIONS = [...COMPONENTS, ...PIPES];

export const EXPORTS = [
  ...COMPONENTS,
  ...PIPES,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatExpansionModule,
  MatIconModule
];

export const PROVIDERS = [UserService,PostService];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: PROVIDERS,
  declarations: DECLARATIONS,
  exports: EXPORTS,
  entryComponents: [
    ConfirmationDialogComponent,
    DynamicComponentLoaderModalComponent,
    SnackbarErrorsComponent
  ]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule
    };
  }
}
