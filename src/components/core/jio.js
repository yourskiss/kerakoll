"use client";
import platform from 'platform';
import axios from "axios";

const osdetails = () => {
  const os = platform.os.family + " | " + platform.os.version;
  return os;
}

const browserdetails = () => {
  const bd = platform.name + " | " + platform.version;
  return bd;
}

const geolocation = () => {
 // const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({positionOptions: {enableHighAccuracy: false,},userDecisionTimeout: 5000,});
 // return !isGeolocationAvailable ? (<p>Your browser does not support Geolocation</p>) : !isGeolocationEnabled ? (<p>Geolocation is not enabled</p>) : coords ? (coords.latitude + "|" + coords.altitude) : (<p>Getting the location data</p>);
 const geo = "geo"
 return geo;
}


const ipaddress = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
//  console.log(res.data.ip);
//  return res.data.ip;
//  const ip = "ip"
  return res.data.ip;
};

export { ipaddress, osdetails, browserdetails, geolocation };
 