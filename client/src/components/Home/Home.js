import {useRef} from "react";
import RazorPay from "../../Api/Razorpay/Razorpay/Razorpay/razorpay";
import Youtube from "../../Api/Razorpay/Razorpay/Youtube/main"



function HomePage(){
    const inputRef=useRef();
    const executeScroll = () => inputRef.current.scrollIntoView() ; 
 return(
     <>
     <div>
     <button style={{position:"fixed", backgroundColor:"yellow", color:"black",marginTop:"25px",marginLeft:"1100px" }} onClick={executeScroll}> Donate Us! </button> 
     </div>
     <div>
         <Youtube/>
     </div>
     <div ref={inputRef}>
         <RazorPay/>
     </div>
     </>
   
 )
}
export default HomePage;