 "use client";
import Link from "next/link";
import Image from 'next/image';
import HeaderComponent from "../shared/HeaderComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ApprovalComponent() {
 
    let pp =  sessionStorage.getItem('userprofilepic') || "/assets/images/profile/dp.png";
    let pn = sessionStorage.getItem('userprofilename') || 'Demmy Account';

    var settingsApproval = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
 
  return (
    <>
    <HeaderComponent />
    <div className="screenmain"> 
        <div className="screencontainer">
                <div className="approvalcontainer">
                        <dl>
                            
                            <dt>
                                <aside><Image src={pp} width={100} height={100} alt="product" quality={99} /></aside>
                            </dt>
                            <dd>
                                <p>
                                    <span>{pn} </span>,
                                    <br />
                                    your request has gone for further approval.
                                </p>
                            </dd>
                            <div className="registerBottomText">
                                Back to <Link href="/" className="backtobutton">Sign in</Link>
                            </div>
                        </dl>      
                        
                        <section>
                            <h2>PRODUCT CATEGORIES</h2>
                            <h3>We have the right solution for every building-related problem</h3>
                            <Slider className="pc_slider" {...settingsApproval}>
                                <div className="pc_item">
                                    <Image src="/assets/images/product-categories/pc1.jpg" width={100} height={100} alt="product" quality={99} />
                                    <p>Waterproofing</p>
                                </div>
                                <div className="pc_item">
                                    <Image src="/assets/images/product-categories/pc2.png" width={100} height={100} alt="product" quality={99} />
                                    <p>Waterproofing</p>
                                </div>
                                <div className="pc_item">
                                    <Image src="/assets/images/product-categories/pc3.png" width={100} height={100} alt="product" quality={99} />
                                    <p>Waterproofing</p>
                                </div>
                                <div className="pc_item">
                                    <Image src="/assets/images/product-categories/pc4.jpg" width={100} height={100} alt="product" quality={99} />
                                    <p>Waterproofing</p>
                                </div>
                            </Slider>
                        </section>
                </div>
            </div>
      </div>
    </>
  )
}
