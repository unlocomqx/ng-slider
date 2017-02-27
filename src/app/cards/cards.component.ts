import { Component, OnInit } from '@angular/core';
import {SliderComponent} from "../slider/slider.component";
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent extends SliderComponent implements OnInit{

  constructor() {
    super();
  }

  protect

  ngOnInit() {
    this._itemSelector = 'div.card';
    this.initSlider();
    this.startSlider();
  }
}
