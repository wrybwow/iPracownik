import { memo, useState } from 'react';

import Papa from "papaparse";

import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

// const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
// const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n');

const center = { lat: 52.4160317045448, lng: 16.961205504104527 }

function DemoContent() {
  const [data, setData] = useState({}); 
  const [infoWindowData, setInfoWindowData] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACR_APP_GOOGLE_MAPS_API_KEY,
  })

  const onInfoWindowClose  = () => {
    setInfoWindowData(null)
  }

  const onMarkerClick  = (data) => {
    setInfoWindowData(data)
  }

  if (!isLoaded) {
    return <div>Error</div>
  }

  Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTNvjit6p7fN7SIaGhTc_CrHBhREYSKMkBuEcSU4iQYD8Pd5063T7sP4g8HypwRmZMNNFXz3Vs2V3Iw/pub?gid=2070038869&single=true&output=csv", {
    download: true,
    header: true,
    complete: (results) => {
      setData(results.data);
    },
  });

  const markers = Array.from(data);

  return (
    <div>
      <GoogleMap 
        center={center} 
        zoom={15} 
        mapContainerStyle={{width: '100%', height:'64vh'}}
      >
        {markers.map((data) => (
          <Marker position={{lat: Number(data.Home_Address_Lat), lng: Number(data.Home_Address_Lng)}} onClick={() => onMarkerClick(data)}>
            
          </Marker>
        ))}
        {infoWindowData && <InfoWindow 
              position={{lat: Number(infoWindowData.Home_Address_Lat), lng: Number(infoWindowData.Home_Address_Lng)}}
              onCloseClick={onInfoWindowClose}
            >
              <div>
                <h1>{infoWindowData.Title}</h1>
                <p>Zajęte Miejsca: {infoWindowData.Taken_Seats}</p>
                <p>Razem Miejsc: {infoWindowData.Total_Seats}</p>
              </div>
            </InfoWindow>}
      </GoogleMap>
    </div>
  );
}

export default memo(DemoContent);
