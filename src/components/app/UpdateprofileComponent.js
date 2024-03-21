"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import HeaderComponent from "../shared/HeaderComponent";
import Loader from "../shared/LoaderComponent";
import { appconfig } from "@/config/config";
import {  setBearerToken } from "@/config/beararauth";
import { isUserToken, isValideUser, getUserToken } from "@/config/userauth";
import { decryptText } from "@/config/crypto";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageCropperWithPreview from "../core/ImageCropperWithPreview";

export default function UpdateprofileComponent() {
    const[loading, setLoading] = useState(false);
    const { push } = useRouter();
    const setBT = setBearerToken()
    const getUT = getUserToken() || '';
    const isUT = isUserToken();
    const isUser = isValideUser();
    
    const decryptUserToken = decryptText(getUT);
    const userMobile = decryptUserToken.split("|")[1]; 

    const [userdata, setUserdata] = useState({});
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [stateID, setStateID] = useState(0);

    const [filedata, setFiledata] = useState('');
    const getFilePath = (data)=>{setFiledata(data);}
   
    useEffect(() => {
        if(!isUT) { push("/"); return  }
        setLoading(true);
        axios({
            url: appconfig.baseurl + "Customer/UserInfo?userid=0&phonenumber="+ userMobile,
            method: "GET",
            headers: { 'authorization': 'Bearer '+ setBT },
        }).then((res) => {
            console.log(res.data.result);
            setLoading(false);
            setUserdata(res.data.result);
        }).catch((err) => {
            toast.warn(err.message);
            setLoading(false); 
        });

        axios({
            url: appconfig.baseurl + "CommonUtility/State?countryId=1",
            method: "GET",
            headers: { 'authorization': 'Bearer '+ setBT  },
        }).then((res) => {
              setStateList(res.data);
        });
    }, [isUT]);


    // useEffect(() => {
    //     axios({
    //         url: appconfig.baseurl + "CommonUtility/City?stateId="+stateID,
    //         method: "GET",
    //         headers: { 'authorization': 'Bearer '+ setBT  },
    //       }).then((res) => {
    //             setCityList(res.data);
    //       });
    // }, [stateID]);
    

 
 
    const handalChange = (e) => {
        setUserdata({ ...userdata, [e.target.name] : e.target.value });
    }
 

    const handalUpdateUser = (e) => {
        e.preventDefault();
        setLoading(true);
     
    
        axios({
            url: appconfig.baseurl + "Customer/UserInfo?userid=1&phonenumber="+ userMobile,
            method: "PUT",
            headers: { 'authorization': 'Bearer '+ setBT  },
            data: userdata,
        }).then((res) => {
            console.log(res);
            setLoading(false);
 
          //  sessionStorage.setItem('userprofilepic', data.profilepic);
          //  sessionStorage.setItem('userprofilename',  data.firstname + " " + data.lastname);
            
            res.data.result ? push("/dashboard") : toast.warn(res.data.resultmessage);
        }).catch((err) => {
            setLoading(false); 
            toast.error(err.message);
        });
    }

  return (
    <>
    <HeaderComponent />
    <div className='screenmain'>
        <section className="screencontainer">
            <form onSubmit={handalUpdateUser}>
            <div className="registercontainer">
                <div className="registerHead">Setup your profile</div>
                <ImageCropperWithPreview filePath={getFilePath} />
                <div className="registerField">
                    <input type="text" value={ filedata || userdata.profilepictureurl } name="profilepic"  />
                </div>
                
                <div className="registerField">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        maxLength={25}
                        value={ userdata.firstname }
                        onChange={handalChange}
                    />
                    <span className="registerError"> </span>
                </div>

                <div className="registerField">
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        maxLength={25}
                        value={ userdata.lastname }
                        onChange={handalChange}
                    />
                    <span className="registerError"> </span>
                </div>

                <div className="registerField">
                    <input
                        type="text"
                        name="emailaddress"
                        placeholder="Email ID"
                        maxLength={25}
                        value={ userdata.emailaddress }
                        onChange={handalChange}
                    />
                    <span className="registerError"> </span>
                </div>


                <div className="registerField">
                    <select className="registerSelect" name="state" defaultValue={ userdata.state } onChange={handalChange} >
                        <option value="" title="">Select State</option>
                        {
                            stateList.map((val) => <option value={val.name} title={val.id} key={val.id}>{val.name}</option>)
                         }
                    </select>
                    <span className="registerError"> </span>
                </div>

 
                {/* <div className="registerField">
                        <select name="city" className="registerSelect"  defaultValue={ userdata.city } value={ userdata.city } onChange={handalChange} >
                        <option value="">Select City</option>
                        {
                            cityList.map((val) => <option value={val.name} key={val.id}>{val.name}</option>)
                        }  
                        </select>
                        <span className="registerError"> </span>
                </div>  */}
       
                <div className="registerSubmit">
                  <button className="register_button">Update</button>
                </div>
            </div>
        </form>
    </section>
    </div>

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

  
 
 