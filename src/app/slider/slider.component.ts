import {Component, OnInit} from '@angular/core';
import {getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  private DOM: any;
  public _itemSelector: string;
  private _scrollingSpeed: number = 700;
  private _autoScrolling: boolean = true;
  private _interval: number = 2000;
  private _loop: boolean = true;
  private _sliderIndex: number = 0;
  private _initialIndex: number = 0;

  private _interval_handle = null;
  private _current_offset = 0;
  private _slider_container = null;
  private _items;

  public get itemSelector(): string {
    return this._itemSelector;
  }

  public set itemSelector(value: string) {
    this._itemSelector = value;
  }

  get scrollingSpeed(): number {
    return this._scrollingSpeed;
  }

  set scrollingSpeed(value: number) {
    this._scrollingSpeed = value;
  }

  get autoScrolling(): boolean {
    return this._autoScrolling;
  }

  set autoScrolling(value: boolean) {
    this._autoScrolling = value;
  }

  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
  }

  get loop(): boolean {
    return this._loop;
  }

  set loop(value: boolean) {
    this._loop = value;
  }

  get initialIndex(): number {
    return this._initialIndex;
  }

  set initialIndex(value: number) {
    this._initialIndex = value;
  }

  get sliderIndex(): number {
    return this._sliderIndex;
  }

  set sliderIndex(value: number) {
    this._sliderIndex = value;
  }

  constructor() {

  }


  public initSlider() {
    this.DOM = getDOM();
    this.initItems();
    this.setSliderContainerWidth();
  }

  private initItems() {
    this._items = this.DOM.querySelectorAll(
      this.DOM.query('body'), // TODO: set to component native element
      this._itemSelector
    );
  }

  public setSliderContainerWidth() {
    let itemWidth = this.getItemWidth(); // TODO: get a more precise width
    let sliderWidth = itemWidth * (this._items.length + 1);
    let firstItem = this._items[0];
    this._slider_container = firstItem.parentNode;
    this._slider_container.style.width = sliderWidth + 'px';
  }

  private setSliderContainerOffset(offset: number) {
    let transform = 'translateX(' + offset + 'px)';
    this._slider_container.style.transform = transform;
    this._current_offset = offset;
  }

  private getItemWidth() {
    let firstItem = this._items[0];
    return firstItem.offsetWidth + 1; // TODO: get a more precise width
  }

  public startSlider() {
    this._interval_handle = setInterval( () => {
      this.goNext();
    }, this._interval);
  }


  public pauseSlider() {
    if (this._interval_handle) {
      clearInterval(this._interval_handle);
      this._interval_handle = null;
    }
  }

  public goNext() {
    let item_width = this.getItemWidth();
    let target_offset = this._current_offset - item_width;
    this._sliderIndex += 1;
    this.setSliderContainerOffset(target_offset);
  }

  public goPrev() {

  }

  public moveTo(index: number) {

  }

  //life cycles
  ngOnInit() {

  }
}
