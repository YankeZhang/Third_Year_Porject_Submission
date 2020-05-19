import {Component} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import {map} from "rxjs/operators"
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
})
export class MapsComponent {

  heading = 'Maps';
  subheading = 'View universities here.';
  icon = 'pe-7s-map icon-gradient bg-premium-dark';
  infowindow;
  // google maps zoom level
  zoom = 5;
  markers: marker[] = [];
  // initial center position for the map
  lat: number = 54.47;
  lng: number = -4.576;
  constructor(private service: MapService) {}

  
  ngOnInit(){
    //get university details and parse to Marker object
    this.service.getAllLocation().pipe(map((req:Array<any>)=>{
      if (req) {
        //construct marker on Google Map
          req.forEach((erg) => {
                this.markers.push({
                  lat: erg.latitude,
                  lng: erg.longitude,
                  label: erg.name, 
                  student: erg.student,
                  staff:erg.staff,
                  request: erg.request,
		              draggable: false
                });
              });
        }
    }))
    .subscribe(post=>{
      console.log(this.markers);
    })
  }
  

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  student:number;
  staff:number;
  request:number;
  draggable: boolean;
}
