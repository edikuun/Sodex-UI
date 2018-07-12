
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbarComponent } from './dashbar.component';

describe('DashbarComponent', () => {
  let component: DashbarComponent;
  let fixture: ComponentFixture<DashbarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
