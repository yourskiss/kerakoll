"use client";
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isUserToken, isValideUser } from "@/config/userauth";
import Link from 'next/link';
 
 
export default  function HeaderComponent() {
  const isUT = isUserToken();
  const isUser = isValideUser();
  const { push } = useRouter();
  const [headclass, setHeadClass] = useState('headersection');
  const [logout, setLogout] = useState(false);
  const [profilename, setProfilename] = useState('');
  const [profilephoto, setProfilephoto] = useState(''); 

 
useEffect(() => {
    if(isUT)
    {
      setHeadClass('headersection headerinner');
      setProfilephoto(sessionStorage.getItem("userprofilepic"));
      setProfilename(sessionStorage.getItem("userprofilename"));
    }
    else
    {
      setHeadClass('headersection');
    }
}, [isUT]);

  function showhidelogout()
  {
    logout == false ? setLogout(true) : setLogout(false);
  }

  const logoutnow = () => {
      Cookies.remove('usertoken');
      sessionStorage.removeItem("userprofilepic");
      sessionStorage.removeItem("userprofilename");
      push("/") ;
  }
  return (
    <>
      <header className={headclass}>
        <aside className="logo">
          <Image src="/assets/images/logo.png" width={100} height={100} alt="logo" quality={80} />
        </aside>
        <section>
            <Link href="/scanqrcode" className='scanqrcodebuttononheader'><Image src="/assets/images/QR.png" width={100} height={100} alt="qr code" quality={80} /></Link>
            <aside>
              <img src={profilephoto}  alt="profile" onClick={showhidelogout} /><span></span>
            </aside>
            {
              logout === true ?
              <ul>
                  <li>Welcome<br /> <Link href='/dashboard'><b>{profilename}</b></Link></li>
                  <li><Link href='/update-profile'>Update Profile</Link></li>
                  <li><Link href='/rewards'>Rewards History</Link></li>
                  <li><span onClick={logoutnow}>Logout</span></li>
              </ul>
              : null }
        </section>
      </header>
 

    </>

  )
}
