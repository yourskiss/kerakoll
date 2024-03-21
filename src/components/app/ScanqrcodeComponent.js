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
import { ipaddress, osdetails, browserdetails, geolocation } from "../core/jio";
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
   
  const geoInfo = geolocation();
  const ipInfo = ipaddress();
  const osInfo = osdetails();
  const browserInfo = browserdetails();

  
 
  useEffect(() => {
    if(!isUT) { push("/"); return  }
  }, [isUT]);

  useEffect(() => {
      const sdURL = scandata.split("?");
      if(sdURL[0] === 'http://localhost:62819/coupon.aspx')
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
      scanlocation: geoInfo,
      ipaddress: ipInfo,
      osdetails: osInfo,
      browserdetails: browserInfo
    }
     console.log(qrdata);
    
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

  return (
    <>
      <HeaderComponent />
      <div className="screenmain" > 
        <div className="screencontainer">
          <p>
            scan data  - { scandata } <br />          
            code  - { couponecode } <br />              
            geoInfo  -  { geoInfo } <br />  
            ipInfo  -  { ipInfo } <br />  
            osInfo  -  { osInfo } <br />  
            browserInfo  -  { browserInfo } <br />  
          </p>
          <form onSubmit={handleSubmitCode}>
            <button>Submit</button>
            </form>
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
