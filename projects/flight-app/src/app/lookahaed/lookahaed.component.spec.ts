/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LookahaedComponent } from './lookahaed.component';

describe('LookahaedComponent', () => {
  let component: LookahaedComponent;
  let fixture: ComponentFixture<LookahaedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookahaedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookahaedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
