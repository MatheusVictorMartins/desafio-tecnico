import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapa-imoveis',
  imports: [RouterLink],
  templateUrl: './mapa-imoveis.html',
  styleUrl: './mapa-imoveis.scss',
})
export class MapaImoveis {
  private http = inject(HttpClient);
  private mapaEl = viewChild.required<ElementRef<HTMLDivElement>>('mapa');
  private mapa?: L.Map;

  ngAfterViewInit() {
    this.mapa = L.map(this.mapaEl().nativeElement).setView([-15.78, -47.93], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(this.mapa);

    this.http.get<any[]>('http://localhost:8080/api/imoveis/mapa').subscribe((imoveis) => {
      const pontos: L.LatLngExpression[] = [];

      for (const i of imoveis) {
        if (i.latitude == null || i.longitude == null) continue;
        const ponto: L.LatLngExpression = [Number(i.latitude), Number(i.longitude)];

        L.circleMarker(ponto, {
          radius: 6,
          color: '#34495e',
          fillColor: '#34495e',
          fillOpacity: 0.8,
        })
          .addTo(this.mapa!)
          .bindPopup(`<b>${i.proprietario.nome}</b><br>${i.municipio} - ${i.uf}`);

        pontos.push(ponto);
      }

      if (pontos.length > 0) {
        this.mapa!.fitBounds(L.latLngBounds(pontos), { padding: [30, 30] });
      }
    });
  }

  ngOnDestroy() {
    this.mapa?.remove();
  }
}
