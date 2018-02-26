import { TestBed } from "@angular/core/testing";
import { Http } from "@angular/http";
import { cold } from "jasmine-marbles";
import { Post } from "../models/post.models";
import { PostService } from "./post.service";
import * as mockedPosts from "../../../../mock/mock-data/mock-posts";

describe("Service: Post", () => {
  let postService: PostService;
  let http: any;
  let basePath: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Http, useValue: jasmine.createSpyObj("Http", ["get"]) },
        PostService
      ]
    });

    postService = TestBed.get(PostService);
    http = TestBed.get(Http);
    basePath = postService.apiBasePath;
  });

  const postGetAllSuccessResult = mockedPosts;

  it("should get all the posts from API", () => {
    const httpResponse = postGetAllSuccessResult;
    const response = cold("-a|", { a: httpResponse });
    const expected = cold("-b|", { b: postGetAllSuccessResult });
    http.get.and.returnValue(response);

    expect(postService.getAll()).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(`${basePath}/posts`);
  });
});
