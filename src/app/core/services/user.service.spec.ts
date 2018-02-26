import { TestBed } from "@angular/core/testing";
import { Http } from "@angular/http";
import { cold } from "jasmine-marbles";
import { User } from "../models/user.models";
import { UserService } from "./user.service";
import * as mockedUsers from "../../../../mock/mock-data/mock-users";

describe("Service: User", () => {
  let userService: UserService;
  let http: any;
  let basePath: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Http, useValue: jasmine.createSpyObj("Http", ["get"]) },
        UserService
      ]
    });

    userService = TestBed.get(UserService);
    http = TestBed.get(Http);
    basePath = userService.apiBasePath;
  });

  const userGetAllSuccessResult = mockedUsers;

  it("should get all the users from API", () => {
    const httpResponse = userGetAllSuccessResult;
    const response = cold("-a|", { a: httpResponse });
    const expected = cold("-b|", { b: userGetAllSuccessResult });
    http.get.and.returnValue(response);

    expect(userService.getAll()).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(`${basePath}/users`);
  });
});
