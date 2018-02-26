import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { UserToken, UserCredentials } from "../models/user.models";
import { environment } from "../../../environments/environment";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";

@Injectable()
export class UserService {
  constructor() {}

  login(userCredentials: UserCredentials): Observable<any> {
    if (
      userCredentials.user === "admin" &&
      userCredentials.password === "admin"
    ) {
      return of({
        success: true,
        token: "token"
      });
    }
    return _throw(new Error("Wrong Credentials"));
  }
}
