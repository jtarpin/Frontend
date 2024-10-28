import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeOrdenesComponent } from './gestion-de-ordenes.component';

describe('GestionDeOrdenesComponent', () => {
  let component: GestionDeOrdenesComponent;
  let fixture: ComponentFixture<GestionDeOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDeOrdenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDeOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
