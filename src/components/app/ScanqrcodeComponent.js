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

export default function ScanqrcodeComponent() {
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState(true);
  const [data, setData] = useState(true);
  const { push } = useRouter();
  const setBT = setBearerToken();
  const isUT = isUserToken();
  const isUser = isValideUser();
  const userID = getUserID();
   
  const geoloc = geolocation();
  const ipInfo = ipaddress();
  const osInfo = osdetails();
  const browserInfo = browserdetails();
 
  useEffect(() => {
  if(!isUT) { push("/"); return  }
  }, [isUT]);


  const handalqrisvailable = (val) => { 
    setQrcode(val);
  }
  const getData =(val) =>{
    setData(val);
  }
 

  // http://localhost:62819/coupon.aspx?code=YLAKSC


  
  const handleSubmitCode = (e) => 
  {
    e.preventDefault();
    setLoading(true);
    const datafinal = {
      userid: userID,
      couponcode: qrcode,
      scanlocation: geoloc,
      ipaddress: ipInfo,
      osdetails: osInfo,
      browserdetails: browserInfo
    }
     console.log(datafinal);
    
    axios({
          url: appconfig.baseurl + "Customer/ValidateCouponAndSave",
          method: "POST",
          headers: { 'authorization': 'Bearer '+ setBT  },
          data: datafinal,
      }).then((res) => {
        setLoading(false);
        res.data.result === null ? console.Console.log(res.data.resultmessage) : console.log(res)
        
      }).catch((err) => {
        console.log(err.message);
        setLoading(false); 
      });
      
  }

  return (
    <>
      <HeaderComponent />
      <div className="screenmain" > 
        <div className="screencontainer">
          <p>
            {data && (data)} <br />            
            geoloc  { geoloc } <br />  
            ipInfo  { ipInfo } <br />  
            osInfo  { osInfo } <br />  
            browserInfo  { browserInfo } <br />  
          </p>
          <form onSubmit={handleSubmitCode}>
            <button>Submit</button>
            </form>
        </div>
      </div> 

      { qrcode ? <QrReader onData={handalqrisvailable} onSuccess={getData} /> : "" }

      { loading ? <Loader /> : null }
    </>
  )
}
