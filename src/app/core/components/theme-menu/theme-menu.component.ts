import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as layout from '../../../core/actions/layout.actions';

@Component({
  selector: 'temp-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }
  setTheme(theme) {
    this.store.dispatch(new layout.SelectThemeAction(theme));
  }
}
