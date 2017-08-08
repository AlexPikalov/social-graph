import { Component, Input, OnChanges, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  template: `<div id="graph-container"></div>`
})
export class GraphComponent implements OnChanges {
  @Input() width = 200;
  @Input() height = 200;
  @Input() data;

  private svg;
  private coordinates: {[key: number]: number[]} = {};

  constructor(el: ElementRef) {
    this.svg = d3.select(el.nativeElement).select('#graph-container');
  }

  ngOnChanges() {
    this.data.nodes.forEach(n => {
      if (!(n in this.coordinates)) {
        this.coordinates[n] = [
          this.generateCoordinate(this.width),
          this.generateCoordinate(this.height)];
      }
    });
  }

  private drawPoints() {

  }

  private generateCoordinate(size: number): number {
    return Math.floor(size * Math.random());
  }
}
