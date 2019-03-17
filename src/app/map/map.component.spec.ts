import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {By} from '@angular/platform-browser';
import {worldCountries} from '../game/country';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(MapComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 troops inside a country', () => {
    component.visualizeTroops(worldCountries);
    const text = fixture.nativeElement.querySelector('text');

    expect(text.innerHTML).toEqual('3');
  });

  it('should send "Brazil" as selectedCountry event on clicking the country BRAZIL', () => {
    const brazil = fixture.debugElement.query(By.css('#Brazil'));

    component.selectedCountry.subscribe((countryName: string) => {
      expect(countryName).toEqual('Brazil');
    });

    brazil.triggerEventHandler('click', null);
  });
});
