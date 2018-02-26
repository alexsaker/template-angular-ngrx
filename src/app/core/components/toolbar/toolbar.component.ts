import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'temp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<boolean>();
  isSidenavMenuOpened: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit() {
    this.isSidenavMenuOpened = this.store.select(fromRoot.getSidenavMenuOpened);
  }

}
