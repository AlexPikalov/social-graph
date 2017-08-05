import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {

  let comp: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let clickEvent: MouseEvent;
  let handler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(ControlsComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('#controls-container'));
    el = de.nativeElement;

    clickEvent = new MouseEvent('click');
  });

  it('should inform a parent component if user wants to get new portion of the graph', () => {
    handler = jasmine.createSpy('handler');
    comp.add.subscribe(handler);
    de.query(By.css('.add-button')).triggerEventHandler('click', clickEvent);
    fixture.detectChanges();
    expect(handler).toHaveBeenCalled();
  });

  it('should inform a parent component if user wants to reset existing graph', () => {
    handler = jasmine.createSpy('handler');
    comp.reset.subscribe(handler);
    de.query(By.css('.reset-button')).triggerEventHandler('click', clickEvent);
    fixture.detectChanges();
    expect(handler).toHaveBeenCalled();
  });
});