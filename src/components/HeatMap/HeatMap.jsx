import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { scaleSequential } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';

const HeatMap = ({ geoData, aggregatedData }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const getColor = value => {
    const colorScale = scaleSequential(interpolateYlOrRd).domain([0, 1000]);
    return colorScale(value);
  };

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
          const popupText =
            record.dataType === "notifications"
              ? `Notificações: ${record.value}`
              : `Imóveis trabalhados: ${record.value}`;

          layer.on('click', () => {
            layer.bindPopup(`
              <b>Setor: ${feature.properties.CD_SETOR}</b><br>
              ${popupText}
            `).openPopup();
          });
        }
      },
    });
  };

  const addLegend = map => {
    // (Mantém o método existente para criar a legenda)
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

