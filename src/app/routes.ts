import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./core/containers/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/users",
    pathMatch: "full"
  },
  {
    path: "authentication",
    loadChildren:
      "./authentication/authentication-routing.module#AuthenticationRoutingModule"
  },
  { path: "**", component: PageNotFoundComponent }
];
