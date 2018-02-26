import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore } from '../../../../../mock/mock-ngrx/mock-store';
import { StoreModule, Store, Action } from '@ngrx/store';
import { MatMenuModule, MatButtonModule,MatIconModule } from '@angular/material';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { ThemeMenuComponent } from './theme-menu.component';

describe('ThemeMenuComponent', () => {
  let component: ThemeMenuComponent;
  let fixture: ComponentFixture<ThemeMenuComponent>;
  const storeInitialState: Object = {
    layout: {
      theme: "cyan-theme",
    }
  };
  let store: Store<any>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeMenuComponent],
      imports: [MatMenuModule, MatButtonModule,MatIconModule],
      providers: [
        { provide: Store, useValue: new MockStore(storeInitialState) }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeMenuComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme', () => {
    spyOn(store, 'dispatch');
    const theme = "myTheme";
    component.setTheme(theme);
    expect(store.dispatch).toHaveBeenCalledWith(new LayoutActions.SelectThemeAction(theme));
  });
});
