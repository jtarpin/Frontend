import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificeComponent } from './edifice.component';

describe('EdificeComponent', () => {
  let component: EdificeComponent;
  let fixture: ComponentFixture<EdificeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdificeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
