"use client";
import Link from "next/link";
import axios from "axios";
 
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import Loader from "../shared/LoaderComponent";
import HeaderComponent from "../shared/HeaderComponent";
import { loginOptions } from "@/locale/en-in";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appconfig } from "@/config/config";
import {  setBearerToken } from "@/config/beararauth";
import { setUserCookies, isUserToken, isValideUser } from "@/config/userauth";
import { encryptText } from "@/config/crypto";
 
export default function LoginComponent() {
  const[loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }  } = useForm();
  const handleError = (errors) => {};
  const { push } = useRouter();
 
  const setBT = setBearerToken();
  const isUT = isUserToken();
  const isUser = isValideUser();
  
  useEffect(() => {
    if(isUT) { push("/dashboard"); return }
   }, [isUT]);
 

  const handleLogin = async (payload) => {
    setLoading(true);
      axios({
         url: appconfig.baseurl + "Customer/UserInfo?userid=0&phonenumber="+ payload.mobile,
         method: "GET",
         headers: { 'authorization': 'Bearer '+ setBT },
     }).then((res) => {
       console.log("login res-", res);
       setLoading(false);
       sessionStorage.setItem("userprofilename",res.data.result.fullname);
       sessionStorage.setItem("userprofilepic",res.data.result.profilepictureurl);
       if(res.data.result.verificationstatus === "APPROVE")
       {
          const userinfo = res.data.result.userid + "|" + res.data.result.phonenumber
          setUserCookies('usertoken', encryptText(userinfo));
          res.data.result ? push("/dashboard") : toast.error(res.data.resultmessage);
       }
       else if(res.data.result.verificationstatus === "PENDING")
       {
          res.data.result ? push("/approval") : toast.error(res.data.resultmessage);
       }
       else
       {
          toast.warn("Your are not registered user. please register after login");
       }

     }).catch((err) => {
        toast.error(err.message);
        setLoading(false); 
     });

  }
 
  
  return (
  <>


    <HeaderComponent />
    <div className='screenmain'>
    <section className="screencontainer">
      <form onSubmit={handleSubmit(handleLogin, handleError)}>
        <div className="registerHead">Welcome! Sign in here</div>
        <div className="registercontainer">
            <div className="registerField">
              <input  type="number" name="mobile" placeholder="Mobile number" {...register('mobile', loginOptions.mobile)} maxLength={10} minLength={10} />
              <span className='registerError'>{errors?.mobile && errors.mobile.message}</span>  
            </div>
        </div>
        
        <div className="registercontainer">
          <div className="registerMsgOtp">OTP Sant to your mobile number</div>
          <div className="registerOtp">
            <div><aside>
              <input type="number" name="otpnumber" {...register('otpnumber', loginOptions.otpnumber)} maxLength={6} minLength={6}  />
            </aside></div> 
          </div>
          <span className='registerError registerErrorCenter'>{errors?.otpnumber && errors.otpnumber.message}</span>  
          <div className="registerOtpText">Not reveived?  <span>Resend OTP</span></div>
        </div>

        <div className="registerSubmit">
          <button className="register_button">Sign In</button>
        </div>
      </form>
      <div className="registerBottomText">Do not have account <Link href="/register">Sign Up</Link></div>
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
