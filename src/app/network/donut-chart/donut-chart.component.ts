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
    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.svgEl = d3.select(this.el.nativeElement.querySelector('.donut-chat-container'))
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append('g')
        .attr('transform',
          `translate(${this.round(this.width / 2)},${this.round(this.height / 2)})`);

    this.pie = d3.pie()
      .sort(null)
      .value((d) =>  d.freq);

    this.arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(this.radius * .3);

    this.drawDonut(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    const data = changes['data'];
    if (data && !data.firstChange) {
      this.drawDonut(data.currentValue);
    }
  }

  private drawDonut(data: DonutData[]) {
    const g = this.svgEl.selectAll('.arc')
          .data(this.pie(data))
        .enter().append('g')
          .attr('class', 'arc');

      g.append('path')
          .attr('d', this.arc)
          .style('fill', d => {
            console.log('>>', this.color(d.data.freq));
            return this.color(d.data.name);
          });

      g.append('text')
          .attr('transform', d => `translate(${this.arc.centroid(d)})`)
          .attr('dy', '.35em')
          .text(d => `${d.data.name} - ${d.data.freq}`);
    // data.forEach(sector => {
    // });
  }

  private round(size: number): number {
    return Math.floor(size);
  }
}
