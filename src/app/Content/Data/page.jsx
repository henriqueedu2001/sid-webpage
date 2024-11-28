'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const HeatMap = dynamic(() => import('@/components/HeatMap/HeatMap'), { ssr: false });

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './data.css';

export default function Page() {
  return (
    <div>
      <Navbar section="data" />
      <Content/>
      <Footer/>
    </div>
  );
}

function Content() {
  const [dataType, setDataType] = useState("notifications");
  const [firstDate, setFirstDate] = useState('202201');
  const [secondDate, setSecondDate] = useState('202312');
  const [geoData, setGeoData] = useState(null);
  const [aggregatedData, setAggregatedData] = useState([]);

  const dataTypes = [
    <option key="notifications" value="notifications">Casos</option>,
    <option key="workedProperties" value="workedProperties">Imóveis trabalhados</option>,
  ];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const generateDateOptions = () => {
    const options = [];
    for (let year = 2022; year <= 2023; year++) {
      for (let month = 0; month < 12; month++) {
        const date = `${year}${String(month + 1).padStart(2, '0')}`;
        const label = `${monthNames[month]} ${year}`;
        options.push(
          <option key={date} value={date}>
            {label}
          </option>
        );
      }
    }
    return options;
  };

  useEffect(() => {
    // Fetch GeoJSON
    fetch('/geo_setores.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error loading GeoJSON:', error));


    const apiBaseUrl = 'http://localhost:8000';  
    const fetchAggregatedData = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/data/sjrp_notifications?start_date=${convertDate(firstDate)}&end_date=${convertDate(secondDate)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch aggregated data');
        }
        const data = await response.json();
        setAggregatedData(data);
      } catch (error) {
        console.error('Error fetching aggregated data:', error);
      }
    };

    fetchAggregatedData();
  }, [dataType, firstDate, secondDate]);

  return (
    <div className='main-container'>
      <h1>Consulte dados de seu interesse</h1>
      
      <label>
        Tipo de consulta por data:{' '}
        <select
          value={dataType}
          onChange={e => setDataType(e.target.value)}
        >
          {dataTypes}
        </select>
      </label>
      
      <label>
        Data inicial:{' '}
        <select
          value={firstDate}
          onChange={e => setFirstDate(e.target.value)}
        >
          {generateDateOptions()}
        </select>
      </label>

      <label>
        Data final:{' '}
        <select
          value={secondDate}
          onChange={e => setSecondDate(e.target.value)}
        >
          {generateDateOptions()}
        </select>
      </label>

      <h2>Mapa de calor</h2>
      <div id="map-container">
        {geoData && aggregatedData.length > 0 && (
          <HeatMap geoData={geoData} aggregatedData={aggregatedData} />
        )}
      </div>
    </div>
  );
}

function convertDate(year_month) {
  const year = year_month.substring(0, 4);
  const month = year_month.substring(4);
  return `${year}-${month}-01`;
}
