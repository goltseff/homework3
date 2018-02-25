import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditComponentComponent } from './item-edit-component.component';

describe('ItemEditComponentComponent', () => {
  let component: ItemEditComponentComponent;
  let fixture: ComponentFixture<ItemEditComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
