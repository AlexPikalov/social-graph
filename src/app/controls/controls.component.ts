import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
/**
 * ControlsComponent present application controls
 */
export class ControlsComponent {
  /**
   * Output event emitter which informs parent component
   * that user wants to add new portion of the social graph
   */
  @Output() add = new EventEmitter<void>();

  /**
   * Output event emitter which informs that user wants to reset
   * the social graph
   */
  @Output() reset = new EventEmitter<void>();
}
