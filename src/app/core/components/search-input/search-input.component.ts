import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "temp-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"]
})
export class SearchInputComponent implements OnInit {
  @Output() searchInputValue = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() removeSearch = new EventEmitter();
  @Input() searchPlaceHolder: Observable<string>;
  @Input() searchInput: Observable<string>;
  @Input() debounce: number;

  mySearchForm: FormGroup;
  searchSnapshot: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchSnapshot = "";
    this.debounce = this.debounce || 50;
    this.mySearchForm = this.fb.group({
      search: ""
    });

    this.mySearchForm.get("search").valueChanges.subscribe(data => {
      this.searchSnapshot = data;
      this.searchInputValue.emit(data);
    });
  }

  emitSearch() {
    this.search.emit(this.searchSnapshot);
  }

  emitRemoveSearch() {
    this.searchSnapshot = "";
    this.removeSearch.emit();
  }
}
