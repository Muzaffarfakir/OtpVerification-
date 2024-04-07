import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
export default function Home() {
    let [otp, setotp] = useState(0);
    let [email, setEmail] = useState("");
    let [timer, settimer] = useState(120);

    useEffect(() => {

        // return () => clearInterval(interval);

    }, [])



    function send() {
        if (email == "") {
            alert("Email Not Valid !")

        } else {
            setInterval(() => {
                settimer(--timer);
                if(timer==0){
                    window.location.reload(true)
                }


            }, 1000);
            axios.post("http://localhost:8080/otp", { otp, email });
            alert("OTP Sent Successfully !")
        }


    }
    function checkotp() {
        // axios.post("http://localhost:8080/verify", { otp ,cotp});
        if (otp == "") {
            alert("Enter The OTP!")

        } else {
            axios.post("http://localhost:8080/verify", { otp, email }).then((res) => {
                if (res.data.mess == 'Verifiy') {
                    alert("OTP Verifiy SuccessFully !")

                }
                else {
                    alert("Invalid OTP !")
                }
            })
        }
    }





    return (
        <>
            <h1 className="text-center my-3 mx-3">
                First Verify Your Self

            </h1>
            <div className="card ">
                <div class="input m-auto mb-3 mx-3 my-3">
                    <input style={{ width: "80vw", height: "80px", margin: "auto" }} type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} class="form-control " placeholder="Enter Email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </div>
                <button onClick={send} style={{ width: "80px", height: "auto", textAlign: "center", margin: "auto", marginTop: '30px', marginBottom: "40px" }} class="input-group-text" id="basic-addon2">Get Otp</button>

                <div style={{ marginTop: "30vh" }} class="input mb-3 my-3 mx-3">
                    <input style={{ width: "80vw", height: "80px", margin: "auto" }} type="number" name="otp" onChange={(e) => { setotp(e.target.value) }} class="form-control" placeholder="Enter Otp Here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <h6 className="text-center mx-3 my-3">The OTP Will Expire in <span style={{ color: "blue" }} className="btn-primary" >{timer}seconds</span></h6>
                    <button onClick={checkotp} style={{ width: "80px", height: "auto", textAlign: "center", margin: "auto", marginTop: '30px' }} class="input-group-text " id="basic-addon2">Check</button>
                </div>

            </div>











        </>



    )
}