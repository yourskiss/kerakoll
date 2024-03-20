"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import HeaderComponent from "../shared/HeaderComponent";
import { getUserID, isUserToken, isValideUser } from "@/config/userauth";
import { appconfig } from "@/config/config";
import { setBearerToken } from '@/config/beararauth';
import Loader from "../shared/LoaderComponent";

export default function RewardshistoryComponent () {
  const [loading, setLoading] = useState(false);
  const [pointhistory, setPointhistory] = useState({});
  const [nodata, setNodata] = useState('');
  const { push } = useRouter();
  const isUT = isUserToken();
  const isUser = isValideUser();
  const setBT = setBearerToken();
  const userID = getUserID();
   
  
  useEffect(() => {
  if(!isUT) { push("/"); return  }
    setLoading(true);
    axios({
        url: appconfig.baseurl + "Customer/UserRewardPointsHistory?userid="+ userID,
        method: "GET",
        headers: { 'authorization': 'Bearer '+ setBT },
    }).then((res) => {
       // console.log("UserRewardPointsHistory - response - ", res);
        setLoading(false);
        if(res.data.result.length !== 0)
        {
          setPointhistory(res.data.result)
        }
        else
        {
          setNodata('No rewards point available');
        }
    }).catch((error) => {
        setLoading(false);
       // console.log("UserRewardPointsHistory - error - ", error);
        setNodata(error.message);
    });

  }, [isUT]);


  return (
  <>
    <HeaderComponent />
    <div className="screenmain" > 
      <div className="screencontainer">
        <h1>Reward Points History</h1>
        { nodata && <h2>{nodata}</h2> }
        { pointhistory &&  pointhistory.map && <ul>{ pointhistory.map((val) => <li key={val.pointid}>{val.pointid} - {val.couponcode} -  { val.scandate } - { val.earnedpoints }</li>) } </ul> }
      </div>
    </div> 



    { loading ? <Loader /> : null }
  </>
  )
}
 

 
 

          
 
 