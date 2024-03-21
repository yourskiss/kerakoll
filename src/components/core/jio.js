"use client";
import platform from 'platform';
// import axios from "axios";
import { useState, useEffect } from 'react';

const osdetails = () => {
  const os = `${platform.os.family || ''} -  ${platform.os.version || ''}`;
  return os;
}

const browserdetails = () => {
  const bd = `${platform.name || ''}  - ${platform.version || ''}`;
  return bd;
}

const geolocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then(response => response.json())
      .then(data => {
        setLatitude(data.latitude)
        setLongitude(data.longitude)
      })
      .catch(error => console.log(error))
  }, [])
 const geo = `${latitude} - ${longitude}`;
 return geo;
}


const ipaddress = () => {
  const [ip, setIP] = useState('');
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIP(data.ip))
      .catch(error => console.log(error))
  }, []);
  return ip;
};

export { ipaddress, osdetails, browserdetails, geolocation };
 