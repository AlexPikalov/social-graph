import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ElementRef,
  SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';

import { DonutData } from './donut-data';

@Component({
  selector: 'app-donut-chart',
  template: `<div class="donut-chat-container"></div>`
})
export class DonutChartComponent implements OnInit, OnChanges {
  @Input() data: DonutData[] = [];

  @Input() width: number;

  @Input() height: number;

  @Input() radius: number;

  constructor(private el: ElementRef) {}

  private svgEl;

  private pie;

  private arc;

  private color;

  ngOnInit() {
    this.color = d3.scaleOrdinal(d3.schemeSet3);

    this.svgEl = d3.select(this.el.nativeElement.querySelector('.donut-chat-container'))
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    this.pie = d3.pie()
      .sort(null)
      .value((d) =>  d.getFreq());

    this.arc = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(this.radius - 70);
  }

  ngOnChanges(changes: SimpleChanges) {
    const data = changes['data'];
    if (data) {
      this.drawDonut(data.currentValue);
    }
  }

  private drawDonut(data: DonutData[]) {
    data.forEach(sector => {
      const g = this.svgEl.selectAll('.arc')
          .data(this.pie(data))
        .enter().append('g')
          .attr('class', 'arc');

      g.append('path')
          .attr('d', 'arc')
          .style('fill', d => this.color(d.data.getName()));

      g.append('text')
          .attr('transform', d => `translate(${this.arc.centroid(d)})`)
          .attr('dy', '.35em');
    });
  }
}
