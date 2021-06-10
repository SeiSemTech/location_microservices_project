import { Injectable } from '@nestjs/common';
declare var google;

@Injectable()
export class MapaService {

    datos = {
        "coordinateList": [
          {
            "x": 4.7501342399421445,
            "y": -74.09565336843772,
            "address": "Cra. 104 #148 - 07, Bogotá, Cundinamarca"
          },
          {
            "x": 4.702362865602372,
            "y": -74.04156321729367,
            "address": "Cl. 142 #111A-06, Suba, Bogotá"
          },
          {
            "x": 35.36100524652076,
            "y": 138.72733665437113,
            "address": "Monte Fuji, Honshu, Japón"
          },
          {
            "x": 51.12975003718817,
            "y": 71.4223813141149,
            "address": "Nurzhol Boulevard, Astaná, Kazakhstan"
          }
        ],
        "input": {
          "x": 4.751649608927578,
          "y": -74.0970145448742,
          "address": "Conjunto arboleda del parque"
        }
    }
    locationsInfo = [];
    map = null;
    loadMap() {
        // create a new map by passing HTMLElement
        // var newDiv = document.createElement("div");
        // var newContent = document.createTextNode("");
        // newDiv.appendChild(newContent);

        const mapEle: HTMLElement = document.getElementById('map');

        // create LatLng object
          // ubicacion principal del usuario
        const myLatLng = {
            lat: this.datos.input.x,
            lng: this.datos.input.y
          }
        // create map
        this.map = new google.maps.Map(mapEle, {
          center: myLatLng,
          zoom: 12
        });
      
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          this.renderMarkers();
          mapEle.classList.add('show-map');
        });
      }
      renderMarkers() {
        this.datos.coordinateList.forEach(lugar => {
            let ubicacionData = {
              position: { lat: lugar.x, lng: lugar.y },
              name: lugar.address
            }
            this.addMarker(ubicacionData);
            // this.locationsInfo.push(ubicacionData)
        });
      }
      addMarker(marker) {
        return new google.maps.Marker({
          position: marker.position,
          map: this.map,
          title: marker.title
        });
      }

}
