"use client";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QrReader from '../core/QrReader';
import HeaderComponent from '../shared/HeaderComponent';
import { appconfig } from "@/config/config";
import { getUserID, isUserToken, isValideUser } from "@/config/userauth";
import { setBearerToken } from "@/config/beararauth";
import Loader from "../shared/LoaderComponent";
import { ipaddress, osdetails, browserdetails, geoLatitude, geoLongitude } from "../core/jio";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ScanqrcodeComponent() {
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState(true);
  const [scandata, setScandata] = useState('');
  const [couponecode, setCouponecode] = useState('');
  const { push } = useRouter();
  const setBT = setBearerToken();
  const isUT = isUserToken();
  const isUser = isValideUser();
  const userID = getUserID();
  const latInfo = geoLatitude();
  const lonInfo = geoLongitude();
  const ipInfo = ipaddress();
  const osInfo = osdetails();
  const browserInfo = browserdetails();

  const couponURL = "http://localhost:62819/coupon.aspx";
 
  useEffect(() => {
    if(!isUT) { push("/"); return  }
  }, [isUT]);

  useEffect(() => {
      const sdURL = scandata.split("?") || '';
      if(sdURL[0] === couponURL)
      {
          const couponvalue = sdURL[1].split("=");
          setCouponecode(couponvalue[1]);
      }
  }, [scandata]);


  const handalqrisvailable = (val) => { 
    setQrcode(val);
  }
  const getData =(val) =>{
    setScandata(val);
  }
 
  const handleSubmitCode = (e) => 
  {
    e.preventDefault();
    setLoading(true);
    const qrdata = {
      userid: userID,
      couponcode: couponecode,
      scanlocation: latInfo + " " + lonInfo,
      ipaddress: ipInfo,
      osdetails: osInfo,
      browserdetails: browserInfo
    }
    console.log(qrdata);
    if(couponecode !== '')
    {
        axios({
          url: appconfig.baseurl + "Customer/ValidateCouponAndSave",
          method: "POST",
          headers: { 'authorization': 'Bearer '+ setBT  },
          data: qrdata,
        }).then((res) => {
          setLoading(false);
          console.log(res)
          res.data.result === null ? toast.error(res.data.resultmessage) : push("/rewards");
        }).catch((err) => {
          setLoading(false); 
          toast.error(err.message);
        });
    }
    else
    {
        toast.error("Invalide Coupon");
    }

  }

  return (
    <>
      <HeaderComponent />
      <div className="screenmain" > 
        <div className="screencontainer">

          <div className="scanqrcodecontainer">
            <h2>Scan Data  <span>({scandata})</span> </h2>
            <ul>
              <li>Latitude: {latInfo}</li>
              <li>Longitude: {lonInfo}</li>
              <li>IP Address: {ipInfo}</li>
              <li>OS Details: {osInfo}</li>
              <li>Browser Details: {browserInfo}</li>
              <li>Coupone Code: {couponecode}</li>
            </ul>
            <form onSubmit={handleSubmitCode} className="scanqrcodeForm">
                <button>Validate and Save Coupon</button>
            </form>
          </div>
 
          
        </div>
      </div> 

      { qrcode ? <QrReader onData={handalqrisvailable} onSuccess={getData} /> : "" }

      <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"  />

      { loading ? <Loader /> : null }
    </>
  )
}
