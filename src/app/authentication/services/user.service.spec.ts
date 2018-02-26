import { TestBed } from "@angular/core/testing";
import { cold } from "jasmine-marbles";
import { UserToken, UserCredentials } from "../models/user.models";
import { UserService } from "./user.service";

describe("Service: User", () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });

    userService = TestBed.get(UserService);
  });

  it("should login when user equals admin and  password equals admin", () => {
    const userCredentials = {
      user: "admin",
      password: "admin"
    } as UserCredentials;

    const userLoginSuccessResult = {
      success: true,
      token: "token"
    };
    userService.login(userCredentials).subscribe(result => {
      expect(result).toEqual(userLoginSuccessResult);
    });
  });
  it("should not login when user does not equal admin or  password does not equal admin", () => {
    const userCredentials = {
      user: "admin",
      password: "wrong password"
    } as UserCredentials;

    const userLoginErrorResult = new Error("Wrong Credentials");

    userService.login(userCredentials).subscribe(
      result => {},
      error => {
        expect(error).toEqual(userLoginErrorResult);
      }
    );
  });
});
