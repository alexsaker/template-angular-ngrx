import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Post } from "../models/post.models";
import { environment } from "../../../environments/environment";

@Injectable()
export class PostService {
  public apiBasePath: string;
  constructor(private http: Http) {
    this.apiBasePath = "https://jsonplaceholder.typicode.com";
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiBasePath}/posts`);
  }
}
