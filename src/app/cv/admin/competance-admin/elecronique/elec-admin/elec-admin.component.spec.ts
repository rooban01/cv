import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElecAdminComponent } from './elec-admin.component';

describe('ElecAdminComponent', () => {
  let component: ElecAdminComponent;
  let fixture: ComponentFixture<ElecAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElecAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElecAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
