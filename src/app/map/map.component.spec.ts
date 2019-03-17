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

  it('should highlight BRAZIL', () => {
    component.highlightCountry('Brazil');
    const brazil = fixture.nativeElement.querySelector('#Brazil');

    expect(brazil.classList).toContain('selected');
  });

  it('should remove highlight of BRAZIL', () => {
    component.clearHighlights();
    const brazil = fixture.nativeElement.querySelector('#Brazil');

    expect(brazil.classList).not.toContain('selected');
  });
});
