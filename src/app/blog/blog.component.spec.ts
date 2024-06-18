import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularIntroductionComponent } from './blog.component';

describe('AngularIntroductionComponent', () => {
  let component: AngularIntroductionComponent;
  let fixture: ComponentFixture<AngularIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularIntroductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
