import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  private _scrollingSpeed:number=700;
  private _autoScrolling:boolean=true;
  private _interval:number=3000;
  private _loop:boolean=true;
  private _sliderIndex:number=0;
  private _initialIndex:number=0;


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



  constructor() { }



  public static moveRight()
  {}

  protected static moveLeft()
  {}

  protected static pause()
  {}

  protected static moveTo(index:number)
  {}
















  //life cycles
  ngOnInit() {
  }

}
