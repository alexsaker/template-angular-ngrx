import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { MatButton } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { isNumeric } from "rxjs/util/isNumeric";
import { Store } from "@ngrx/store";
import * as fromAuth from "../../reducers";
import { ElementRef } from "@angular/core/src/linker/element_ref";

@Component({
  selector: "temp-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  @ViewChild("user") userViewChild;
  @ViewChild("userPassword") passwordViewChild;
  @Output() formData = new EventEmitter<any>();
  @Input() type: string;
  myForm: FormGroup;
  passwordInputType: string;
  isLoading: Observable<boolean>;
  passwordPlaceHolder: Observable<string>;
  loginError: Observable<any>;
  passwordMinLength: number;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromAuth.State>,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {}

  isNumeric(value) {
    return isNumeric(value);
  }

  get user() {
    return this.myForm.get("user");
  }
  get password() {
    return this.myForm.get("password");
  }

  ngOnInit() {
    this.passwordMinLength = 5;
    this.passwordInputType = "password";
    this.createForm();
    this.isLoading = this.store.select(fromAuth.getUserLoading);
    this.loginError = this.store.select(fromAuth.getUserError);
  }

  ngAfterViewInit() {
    if (this.userViewChild) {
      this.userViewChild.nativeElement.focus();
    }
    this.changeRef.detectChanges();
  }

  createFormControls(): Object {
    return {
      user: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(this.passwordMinLength)
      ])
    };
  }

  createForm() {
    const formControls: Object = this.createFormControls();
    this.myForm = this.fb.group(formControls);
  }
  emitForm() {
    if (this.myForm.valid) {
      this.formData.emit(this.myForm.value);
    }
  }
  toggleInputType() {
    if (this.passwordInputType === "password") {
      this.passwordInputType = "text";
    } else {
      this.passwordInputType = "password";
    }
  }
}
