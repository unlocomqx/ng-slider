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
  private _scrollingDuration: number = 300;
  private _autoScrolling: boolean = true;
  private _interval: number = 2000;
  private _loop: boolean = true;
  private _sliderIndex: number = 0;
  private _initialIndex: number = 0;
  private _immediateResize: boolean = true;

  /* specific variables */
  private _resize_timeout_handle = null;
  private _interval_handle = null;
  private _current_offset = 0;
  private _slider_container = null;
  private _items;

  constructor() {

  }

  public initSlider(autoStart: boolean = true) {
    this.DOM = getDOM();
    this.registerResizeEvent();
    this.initItems(true);
    this.setSliderContainerWidth();
    if (autoStart) {
      this.startSlider();
    }
  }

  private registerResizeEvent() {
    addEventListener('resize', this._onResize.bind(this));
  }

  public _onResize() {
    if (this._immediateResize) {
      if ('requestAnimationFrame' in window) {
        window.requestAnimationFrame(() => {
          this.windowResized();
        });
      } else {
        this.windowResized();
      }
    } else {
      if (this._resize_timeout_handle) {
        clearTimeout(this._resize_timeout_handle);
      }
      this._resize_timeout_handle = setTimeout(() => {
        this.windowResized();
      }, 100);
    }
  }

  public windowResized() {
    this.setSliderContainerWidth();
    this.fixSliderOffset();
  }

  public handleTransitionEnd() {
    this._slider_container.className = this._slider_container.className.replace(' no-transition', '');
    this.queueFirstItem();
  }

  public initItems(setIndex: boolean = false) {
    this._items = this.DOM.querySelectorAll(
      this.DOM.query('body'), // TODO: set to component native element
      this._itemSelector
    );
    if (setIndex) {
      this._items.forEach((item, index) => {
        item.setAttribute('index', index);
      });
    }
  }

  public setSliderContainerWidth() {
    let itemWidth = this.getItemWidth(); // TODO: get a more precise width
    let sliderWidth = itemWidth * (this._items.length + 1);
    let firstItem = this._items[0];
    this._slider_container = firstItem.parentNode;
    this._slider_container.style.width = sliderWidth + 'px';
  }

  public setSliderContainerOffset(offset: number, transition: boolean = true) {
    if (!transition) {
      this._slider_container.style.transitionDuration = '0s';
    }
    let transform = 'translateX(' + offset + 'px)';
    this._slider_container.style.transform = transform;
    this._current_offset = offset;
    if (!transition) {
      // force repaint before restoring animation duration
      this._slider_container.offsetHeight;
      this._slider_container.style.transitionDuration = '';
    } else {
      setTimeout(() => {
        this.handleTransitionEnd()
      }, this._scrollingDuration);
    }
  }

  private fixSliderOffset() {
    let current_item = this._items[this._sliderIndex];
    let item_offset = current_item.offsetLeft;
    this.setSliderContainerOffset(-item_offset);
  }

  public getItemWidth() {
    let firstItem = this._items[0];
    return firstItem.offsetWidth + 1; // TODO: get a more precise width
  }

  public startSlider() {
    this._interval_handle = setInterval(() => {
      this.goNext();
    }, this._interval);
  }

  public pauseSlider() {
    if (this._interval_handle) {
      clearInterval(this._interval_handle);
      this._interval_handle = null;
    }
  }

  public canGoNext() {
    let container_width = this._slider_container.parentNode.offsetWidth;
    let item_width = this.getItemWidth();
    let items_in_view = Math.round(container_width / item_width);
    let result = items_in_view < this._items.length;
    return result;
  }

  public goNext() {
    if (!this.canGoNext()) {
      this.resetItems();
      return;
    }
    let item_width = this.getItemWidth();
    let target_offset = this._current_offset - item_width;
    this._sliderIndex += 1;
    this.setSliderContainerOffset(target_offset);
  }

  public goPrev() {
    let item_width = this.getItemWidth();
    let target_offset = this._current_offset + item_width;
    this._sliderIndex -= 1;
    this.setSliderContainerOffset(target_offset);
  }

  public goTo(index: number) {
    let target_item = this._items[index];
    let item_offset = target_item.offsetLeft;
    this._sliderIndex = index;
    this.setSliderContainerOffset(-item_offset);
  }

  private queueFirstItem() {
    if (this._sliderIndex > 0) {
      let first_item = this._items[0];
      let item_parent = first_item.parentNode;
      item_parent.appendChild(first_item);
      this._sliderIndex = 0;
      this._slider_container.style.transitionDuration = '0s';
      this.setSliderContainerOffset(0, false);
      this.initItems();
    }
  }

  private resetItems(){
    // restore items original order
    this.initItems();
    this._items.forEach((item, index) => {
      let item_index = Number(item.getAttribute('index'));
      if (item_index < index) {
        let parentNode = item.parentNode;
        parentNode.insertBefore(item, this._items[0]);
      }
    });
    this.initItems();
  }

  //life cycles
  ngOnInit() {

  }
}
