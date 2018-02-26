import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [SearchInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.debounce).toEqual(50);
  });

  it('should emit searchInputValue when form changes', fakeAsync(() => {
    spyOn(component.searchInputValue, 'emit');
    component.debounce = 40;
    const search = 'test';
    component.mySearchForm.controls["search"].setValue(search);
    fixture.detectChanges();
    tick(50);
    expect(component.searchSnapshot).toEqual(search);
    expect(component.searchInputValue.emit).toHaveBeenCalledWith(search);
  }));

  it('should emit search when button clicked', () => {
    spyOn(component.search, 'emit');
    const search = 'test';
    component.searchSnapshot = search;
    component.emitSearch();
    expect(component.search.emit).toHaveBeenCalledWith(search);
  });

  it('should emit removeSearch when cross clicked', () => {
    spyOn(component.removeSearch, 'emit');
    const search = 'test';
    component.emitRemoveSearch();
    expect(component.searchSnapshot).toEqual('');
    expect(component.removeSearch.emit).toHaveBeenCalled();
  });

});
