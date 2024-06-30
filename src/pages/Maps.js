import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

import imagePreview from '../img/shop.jpg';
import PinLogo from '../img/pinLoc.png';

const GetMap = () => {
  const [location, setLocation] = useState({
    latitude: 121.049574,
    longitude: 121.049574});
  const [error, setError] = useState(null);

  const txtLongitude = useRef(121.049574);
  const txtLatitude = useRef(14.670409);
  const mapRef = useRef();

 // mapRef.current.setView([txtLatitude, txtLongitude], mapRef.current.getZoom());


  // Define the custom coffee icon
  const icon = new L.Icon({
    iconUrl: PinLogo,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });

  const handleSearch = () => {
    const lat = parseFloat(txtLatitude.current.value);
    const lng = parseFloat(txtLongitude.current.value);

    if (!isNaN(lat) && !isNaN(lng)) {
      setLocation({ latitude: lat, longitude: lng });
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], mapRef.current.getZoom());
      }
    } else {
      alert('Please enter valid numeric coordinates');
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(
            `Unable to retrieve your location (${error.code}): ${error.message}`
          );
        }
      );
    };

    getLocation();
  }, []);


  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], 13);
    }
  }, [location]);


  const markerPosition = location
    ? [location.latitude, location.longitude]
    : [14.6287, 121.0342];

  return (
    <div>
      <div className='d-flex flex-md-row flex-column'>
        <div className="mb-3 col-md-3 col-12">
          <label htmlFor="longitude" className="form-label">Enter Longitude</label>
          <input
            type="text"
            className="form-control"
            id="longitude"
            ref={txtLongitude}
            placeholder="Enter longitude"
          />
        </div>

        <div className="mb-3 col-md-3 col-12 mx-2">
          <label htmlFor="latitude" className="form-label">Enter Latitude</label>
          <input
            type="text"
            className="form-control"
            id="latitude"
            ref={txtLatitude}
            placeholder="Enter latitude"
          />
        </div>

        <div className="mb-3 col-md-3 col-12 d-flex align-items-end mx-2">
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
      </div>

      {location ? (
        <p>
          Your pin location is: <br />
          Longitude: {location.longitude}, Latitude: {location.latitude}
        </p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}

      <MapContainer
        center={markerPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '80vh', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={markerPosition} icon={icon}>
          <Popup>
            <div className="p-0 d-flex flex-column bg-da" style={{ width: '19rem' }}>

            <div className="card-body">
                <div className=" d-flex row p-0">
                  <div className="col-6">
                   <label>Longitude: {location.longitude} </label>
                  </div>
                  <div className="col-6">
                  <label>Latitude: {location.latitude}</label>
                  </div>
                </div>
              </div>

              {/* <img
                src={imagePreview}
                style={{ maxHeight: '130px', width: 'auto' }}
                className="card-img-top img-fluid bg-danger"
                alt="..."
              />
              <div className="card-body">
                <div className=" d-flex row p-0">
                  <div className="col-6">
                    <a className="btn w-100" href="#" role="button">See More</a>
                  </div>
                  <div className="col-6">
                    <a className="btn w-100" href="#" role="button">Get Directions</a>
                  </div>
                </div>
              </div> */}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GetMap;
