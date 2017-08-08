import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ElementRef,
  SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';

import { Tag } from './tags';

@Component({
  selector: 'app-tag-cloud',
  template: `<div id='graph-container'></div>`
})
export class TagCloudComponent implements OnChanges, OnInit {
  @Input() width = 200;
  @Input() height = 200;
  @Input() data;

  /**
   * D3 svg selection
   *
   * @private
   * @memberof TagCloudComponent
   */
  private svg;

  /**
   * D3 ordinal color palette
   *
   * @private
   * @memberof TagCloudComponent
   */
  private color = d3.scaleOrdinal(d3.schemeCategory20c);

  /**
   * D3 pack function. Main purpose of this function is space distribution of nodes
   * in order to compactly pack them.
   * @private
   * @memberof TagCloudComponent
   */
  private pack;

  /**
   * Hierarchy of tags. In current case all tags are
   * on the same level and are siblings in fact.
   * @private
   * @memberof TagCloudComponent
   */
  private root;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.svg = d3.select(this.el.nativeElement)
      .select('#graph-container')
      .append('svg');
    this.svg.attr('width', this.width);
    this.svg.attr('height', this.height);
    this.updatePack();
    this.updateRoot();
  }

  ngOnChanges(change: SimpleChanges) {
    // re-render plot if new data came and pack distribution was evaluated for
    // current hierarchy
    if (change['data'] && this.pack) {
      this.updateRoot();
      this.draw();
    }
  }

  /**
   * updatePack evaluates nodes distrubution.
   * @private
   * @memberof TagCloudComponent
   */
  private updatePack() {
    this.pack = d3.pack()
      .size([this.width, this.height])
      .padding(1.5);
  }

  /**
   * updateRoot evaluates current hierarchy.
   * @private
   * @memberof TagCloudComponent
   */
  private updateRoot() {
    this.root = d3.hierarchy({children: this.data})
      .sum((d: Tag) => d.freq);
  }

  /**
   * Draw nodes and distribute them in accordance to
   * current pack function.
   * @private
   * @memberof TagCloudComponent
   */
  private draw() {
    const node = this.svg.selectAll('.tag')
      .data(this.pack(this.root).leaves())
      .enter().append('g')
        .attr('class', 'tag')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', d => d.r)
      .style('fill', d => this.color(d.data.freq));

    // text hint
    node.append('title')
        .text(d => `${d.data.name} - ${d.data.freq}`);
  }
}
