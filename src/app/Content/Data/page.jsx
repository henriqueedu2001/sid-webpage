'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const HeatMap = dynamic(() => import('@/components/HeatMap/HeatMap'), { ssr: false });

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './data.css';

export default function Page() {
  return (
    <div className='layout'>
      <Navbar section="data" />
      <Content />
      <Footer />
    </div>
  );
}

function Content() {
  const [dataType, setDataType] = useState("notifications");
  const [firstDate, setFirstDate] = useState("202201");
  const [secondDate, setSecondDate] = useState("202312");
  const [geoData, setGeoData] = useState(null);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState(null);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const generateDateOptions = (minDate = null) => {
    const options = [];
    const startYear = dataType === "workedProperties" ? 2016 : 2022;
    const startMonth = dataType === "workedProperties" ? 9 : 1;
  
    const endYear = 2023;
    const endMonth = 12;
  
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        if (year === startYear && month < startMonth) continue;
        if (year === endYear && month > endMonth) break;
  
        const date = `${year}${String(month).padStart(2, "0")}`;
  
        // Aplicar filtro de `minDate` apenas para "notifications"
        if (dataType === "notifications" && minDate && date < minDate) continue;
  
        const label = `${monthNames[month - 1]} ${year}`;
        options.push(
          <option key={date} value={date}>
            {label}
          </option>
        );
      }
    }
    return options;
  };
  

  const calculateStartDate = (endDate) => {
    const year = parseInt(endDate.substring(0, 4), 10);
    const month = parseInt(endDate.substring(4, 6), 10);

    // Subtrct 3 mont=hs in order to show 4 month data in total
    const newMonth = (month - 3 + 12) % 12 || 12;
    const newYear = month <= 3 ? year - 1 : year;

    return `${newYear}${String(newMonth).padStart(2, "0")}`;
  };

  useEffect(() => {
    // Atualizar `secondDate` automaticamente se estiver fora do intervalo
    if (dataType === "notifications" && secondDate < firstDate) {
      setSecondDate(firstDate); // Ajusta para coincidir com o `firstDate`
    }
  }, [firstDate, dataType]);

  useEffect(() => {
    fetch("/geo_setores.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const handleGenerateMap = async () => {
    setIsLoading(true);

    const apiBaseUrl = "https://sid-api-yrbb.onrender.com";
    const fetchAggregatedData = async () => {
      try {
        const endpoint =
          dataType === "notifications"
            ? "/data/sjrp_notifications"
            : "/data/sisa_web_properties";

        const startDateToUse =
          dataType === "workedProperties"
            ? calculateStartDate(secondDate)
            : firstDate;

        const response = await fetch(
          `${apiBaseUrl}${endpoint}?start_date=${convertDate(
            startDateToUse
          )}&end_date=${convertDate(secondDate)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch aggregated data");
        }

        const data = await response.json();
        setAggregatedData(data);

        setLastQuery({
          dataType: dataType === "notifications" ? "Casos" : "Imóveis trabalhados",
          startDate: formatDate(startDateToUse),
          endDate: formatDate(secondDate),
        });
      } catch (error) {
        console.error("Error fetching aggregated data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAggregatedData();
  };

  const formatDate = (date) => {
    const year = date.substring(0, 4);
    const month = parseInt(date.substring(4), 10);
    return `${monthNames[month - 1]} ${year}`;
  };

  return (
    <div>
      <h1>Consulte dados de São José do Rio Preto
        <p>
          <a href='/Content/DataInfo' className='info-link'> {/* TODO: Create DataInfo page */}
            Mais informações
          </a>
        </p>
      </h1>

      <label>
        Tipo de consulta por data:{" "}
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="notifications">Casos confirmados de dengue</option>
          <option value="workedProperties">Imóveis trabalhados</option>
        </select>
      </label>

      {dataType === "notifications" && (
        <label>
          Data inicial:{" "}
          <select
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
          >
            {generateDateOptions()}
          </select>
        </label>
      )}

    <label>
      Data final:{" "}
      <select
        value={secondDate}
        onChange={(e) => setSecondDate(e.target.value)}
      >
        {generateDateOptions(dataType === "notifications" ? firstDate : null)}
      </select>
    </label>

      {dataType === "workedProperties" && (
        <div>
          <center>
          <p >
            <strong>Nota:</strong> A data inicial foi omitida porque é definida
            automaticamente como três meses antes da data final selecionada.
          </p>
          </center>
          
        </div>
      )}

      <button onClick={handleGenerateMap} className="generate-button">
        Gerar mapa
      </button>

      {isLoading && <center><div className="loading-spinner"></div></center>}

      {lastQuery && (
        <div className="query-summary">
          <p>
            <strong>Últimos Dados Utilizados:</strong>
            <br />
            Tipo de Dados: {lastQuery.dataType}
            <br />
            Data Inicial: {lastQuery.startDate}
            <br />
            Data Final: {lastQuery.endDate}
          </p>
        </div>
      )}

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
