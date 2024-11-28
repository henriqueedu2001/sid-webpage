import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { csv } from 'd3-fetch';
import { scaleSequential } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';

const HeatMap = ({ geoData, aggregatedData }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);


  const createLayer = (geoData, aggregatedData) => {
    return L.geoJSON(geoData, {
      style: feature => {
        const sectorCode = feature.properties.CD_SETOR;
        const record = aggregatedData.find(d => d.censitary_code === sectorCode);

        const color = record ? getColor(record.value) : 'lightgrey';
        return {
          color: 'grey',
          weight: 1,
          fillColor: color,
          fillOpacity: 0.7,
        };
      },
      onEachFeature: (feature, layer) => {
        const sectorCode = feature.properties.CD_SETOR;
        const record = aggregatedData.find(d => d.censitary_code === sectorCode);

        if (record) {
          layer.on('click', () => {
            layer.bindPopup(`
              <b>Setor: ${feature.properties.CD_SETOR}</b><br>
              Notificações: ${record.value}
            `).openPopup();
          });
        }
      },
    });
  };

  const getColor = value => {
    const colorScale = scaleSequential(interpolateYlOrRd).domain([0, 1000]);
    return colorScale(value);
  };

  const addLegend = map => {
    // Remove existing legends
    const existingLegends = document.querySelectorAll('.legend');
    existingLegends.forEach(legend => legend.remove());

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const colorScale = scaleSequential(interpolateYlOrRd).domain([0, 1000]); // Alterado para 0 a 1000

      // Gradiente
      const gradientDiv = L.DomUtil.create('div', 'legend-gradient');
      gradientDiv.style.height = '30px';
      gradientDiv.style.width = '200px';
      gradientDiv.style.background = `linear-gradient(to right, 
        ${colorScale(0)}, 
        ${colorScale(250)}, 
        ${colorScale(500)}, 
        ${colorScale(750)}, 
        ${colorScale(1000)})`;

      div.appendChild(gradientDiv);

      // Rótulos
      const labelsDiv = L.DomUtil.create('div', 'legend-labels');
      labelsDiv.style.display = 'flex';
      labelsDiv.style.justifyContent = 'space-between';
      labelsDiv.innerHTML = `
        <span>0</span>
        <span>250</span>
        <span>500</span>
        <span>750</span>
        <span>1000</span>
      `;
      div.appendChild(labelsDiv);

      return div;
    };

    legend.addTo(map);
};

useEffect(() => {
  if (mapRef.current && geoData) {
    const map = L.map(mapRef.current, { zoomControl: false });
    mapInstanceRef.current = map;

    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>',
        maxZoom: 19,
        id: 'cartodb/light_all',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);

    const bounds = L.geoJSON(geoData).getBounds();
    map.fitBounds(bounds);

    map.on('load', () => {
      if (aggregatedData.length && geoData) {
        const newLayer = createLayer(geoData, aggregatedData);
        newLayer.addTo(map);
        addLegend(map);
      }
    });

    return () => map.remove();
  }
}, [geoData, aggregatedData]);

useEffect(() => {
  if (mapInstanceRef.current && aggregatedData.length && geoData) {
    const newLayer = createLayer(geoData, aggregatedData);
    newLayer.addTo(mapInstanceRef.current);
    addLegend(mapInstanceRef.current);
  }
}, [aggregatedData, geoData]);

  return <div ref={mapRef} style={{ height: '650px', marginTop: '20px' }} />;
};

export default HeatMap;
