import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "temp-loading-button",
  templateUrl: "./loading-button.component.html",
  styleUrls: ["./loading-button.component.scss"]
})
export class LoadingButtonComponent implements OnInit {
  @Output() action = new EventEmitter<boolean>();
  @Input() text: string;
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() diameter: number;
  // text:string;
  constructor() {}

  ngOnInit() {
    this.loading = this.loading || false;
    this.diameter = this.diameter || 30;
    this.text = this.text || "NO TEXT";
    this.disabled = this.disabled || true;
  }
  doAction() {
    this.action.emit(true);
  }
}
