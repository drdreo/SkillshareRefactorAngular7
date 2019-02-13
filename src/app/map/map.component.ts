import {Component, AfterViewInit, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {Country} from '../game/country';

@Component({
  selector: 'ah-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Output() selectedCountry = new EventEmitter<string>();
  @Input() countries: Country[];


  constructor() {
  }

  ngAfterViewInit() {
    this.addEventListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.visualizeTroops(this.countries);
  }

  addEventListeners() {
    const countryElements = document.querySelectorAll('.country');
    countryElements.forEach((countryElement) => {
      countryElement.addEventListener('click', (e) => {
        this.handleMapClick(e.target as SVGGraphicsElement);
      });
    });
  }

  selectCountry(country: string) {
    this.highlightCountry(country);
    this.selectedCountry.emit(country);
  }

  highlightCountry(country: string) {
    this.clearHighlights();
    document.querySelector('#' + country).classList.toggle('selected');
  }

  handleMapClick(target: SVGGraphicsElement) {
    this.selectCountry(target.id);
  }

  visualizeTroops(countries: Country[]) {
    // needed when updating troops, else numbers would be printed ontop
    this.clearTroopHelpers();

    for (const country of countries) {
      const countryElement = document.querySelector('#' + country.name) as SVGGraphicsElement;
      const coordinates = this.getCoordinatesFromBBox(countryElement.getBBox());
      this.appendTextAtCoordinates('' + country.troops, coordinates.x, coordinates.y);
    }
  }

  // vanilla JS helper methods

  clearHighlights() {
    document.querySelectorAll('.country').forEach(country => {
      country.classList.remove('selected');
    });
  }

  clearTroopHelpers() {
    document.querySelector('#troops-helpers').innerHTML = '';
  }

  getCoordinatesFromBBox(boundingBox: DOMRect) {
    return {x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + boundingBox.height / 2};
  }

  appendTextAtCoordinates(text: string, x: number, y: number) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const txt = document.createElementNS(svgNS, 'text');
    txt.setAttributeNS(null, 'x', x + '');
    txt.setAttributeNS(null, 'y', y + '');
    txt.setAttributeNS(null, 'font-size', '20');
    txt.setAttributeNS(null, 'font-family', 'Arial');

    txt.innerHTML = text;
    document.querySelector('#troops-helpers').appendChild(txt);
  }
}
