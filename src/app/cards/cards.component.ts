import {Component, OnInit} from "@angular/core";
import {Slider} from "../classes/slider";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent extends Slider implements OnInit{

  constructor() {
    super();
  }

  protect

  ngOnInit() {
    this._itemSelector = 'div.card';
    this.initSlider();
  }
}
