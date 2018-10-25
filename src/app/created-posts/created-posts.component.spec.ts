import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedPostsComponent } from './created-posts.component';

describe('CreatedPostsComponent', () => {
  let component: CreatedPostsComponent;
  let fixture: ComponentFixture<CreatedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
