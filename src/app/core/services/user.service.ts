import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { User } from "../models/user.models";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
  public apiBasePath: string;
  constructor(private http: Http) {
    this.apiBasePath = "https://jsonplaceholder.typicode.com";
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiBasePath}/users`);
  }
}
