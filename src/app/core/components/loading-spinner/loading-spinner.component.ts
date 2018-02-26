import { Component, OnInit, Input } from "@angular/core";
@Component({
  selector: "temp-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"]
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() diameter: number;
  constructor() {}

  ngOnInit() {
    this.diameter = this.diameter || 300;
  }
}
