import { Component, Input, OnChanges, OnInit, ElementRef, SimpleChanges } from '@angular/core';

import * as R from 'ramda';
import * as d3 from 'd3';

const EDGE_COLOR = '#a8a8a8';
const HIGHLIGHTED_EDGE_COLOR = '#ffb43d';

@Component({
  selector: 'app-graph',
  template: `<div>
    <div *ngIf="data.nodes.length" class="hint">
      Hint: hover a node to see its id and what it follows
    </div>
    <div id='graph-container'></div>
  </div>`,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {
  /**
   * Plot width
   */
  @Input() width = 200;

  /**
   * Plot height
   */
  @Input() height = 200;

  /**
   * Plot data
   */
  @Input() data;

  /**
   * Returns diameter of a circle where all the nodes should be placed
   */
  private get diameter(): number {
    return Math.min(this.width, this.height);
  }

  /**
   * A half of diameter
   */
  private get radius(): number {
    return this.diameter / 2 - 20;
  }

  /**
   * Color scale
   */
  private color = d3.scaleOrdinal(d3.schemeCategory20);

  /**
   * SVG element
   */
  private svg;

  private nodes;

  private connections;

  /**
   * A map that holds relations between node id and it's azimuth.
   */
  private angles: {[key: number]: number} = {};

  constructor(private el: ElementRef) {}    

  ngOnInit() {
    this.svg = d3.select(this.el.nativeElement).select('#graph-container')
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.width)
      .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    this.connections = this.svg.append('g').attr('class', 'connections');
    this.nodes = this.svg.append('g').attr('class', 'nodes');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.svg) {
      this.data.nodes.forEach((n, i) => {
        this.angles[n] = this.getAngle(i, this.data.nodes.length);
      });
      this.draw(this.data.nodes);
    } 
  }

  /**
   * Main draw function.
   * @param children 
   */
  private draw(children) {
    const connections = this.connections.selectAll('line')
      .data(this.data.connections);

    // update existing node connections once new added
    connections
      .attr('x1', d => this.x(this.angles[d[0]]))
      .attr('y1', d => this.y(this.angles[d[0]]))
      .attr('x2', d => this.x(this.angles[d[1]]))
      .attr('y2', d => this.y(this.angles[d[1]]))

    // add new connectoins
    connections.enter().append('line')
      .attr('x1', d => this.x(this.angles[d[0]]))
      .attr('y1', d => this.y(this.angles[d[0]]))
      .attr('x2', d => this.x(this.angles[d[1]]))
      .attr('y2', d => this.y(this.angles[d[1]]))
      .attr('stroke', EDGE_COLOR)
      .attr('stroke-width', 1)
      .attr('class', d => `from-${d[0]} to-${d[1]}`);

    connections.exit().remove();

    const nodes = this.nodes.selectAll('circle')
      .data(this.data.nodes);

    // update existing node positions onse new added
    nodes
      .attr('cx', d => this.x(this.angles[d]))
      .attr('cy', d => this.y(this.angles[d]));

    // add new nodes
    nodes.enter()
      .append('circle')
        .attr('id', d => `node-${d}`)
        .attr('r', 6)
        .attr('cx', d => this.x(this.angles[d]))
        .attr('cy', d => this.y(this.angles[d]))
        .attr('fill', d => this.color(d))
        .on('mouseover', d => this.highlightConnectionsFrom(d))
        .on('mouseout', d => this.unhighlightConnectionsFrom(d))
      .append('title')
        .text(d => d);

    nodes.exit().remove();
  }

  /**
   * Get angle for i-th node.
   * @param i 
   * @param all 
   */
  private getAngle(i: number, all: number): number {
    return Math.PI * 2 / all * i;
  }

  /**
   * Returns X-coordinate for a node with azimuth angle
   * @param angle 
   */
  private x(angle: number): number {
    return this.radius * Math.cos(angle);
  }

  /**
   * Returns Y-coordinate for a node with azimuth angle
   * @param angle 
   */
  private y(angle: number): number {
    return this.radius * Math.sin(angle);
  }

  /**
   * Highlight a dot which represents a node and connections
   * to those nodes which the current one follows
   * @param node 
   */
  private highlightConnectionsFrom(node: number) {
    this.svg.select(`#node-${node}`).attr('r', 8);
    this.svg.selectAll(`.from-${node}`)
      .attr('stroke', HIGHLIGHTED_EDGE_COLOR)
      .attr('stroke-width', 3);
  }

  /**
   * Unhighlight nodes and connections for given node.
   * @param node 
   */
  private unhighlightConnectionsFrom(node: number) {
    this.svg.select(`#node-${node}`).attr('r', 6);
    this.svg.selectAll(`.from-${node}`)
      .attr('stroke', EDGE_COLOR)
      .attr('stroke-width', 1);
  }
}
