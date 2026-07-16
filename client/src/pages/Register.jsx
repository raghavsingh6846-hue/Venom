import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = "https://venom-server-5dey.onrender.com";

export default function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    async function register() {

        if (!username.trim()) {
            alert("Enter Username");
            return;
        }

        try {

            const res = await axios.post(
                `${API}/auth/register`,
                {
                    username
                }
            );

            if (res.data.success) {

                alert("Registration Successful");

                navigate("/");

            } else {

                alert(res.data.message);

            }

        } catch (err) {

            console.log(err);
            alert("Server Error");

        }

    }

    return (

        <div
            style={{
                minHeight:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
                fontFamily:"Arial"
            }}
        >

            <div
                style={{
                    width:"320px",
                    padding:"35px",
                    borderRadius:"30px",
                    background:"rgba(255,255,255,0.18)",
                    backdropFilter:"blur(12px)",
                    textAlign:"center",
                    color:"white"
                }}
            >

                <h1 style={{
                    fontSize:"38px",
                    marginBottom:"5px"
                }}>
                    Join Venom 🐍
                </h1>

                <p>
                    Create your social account
                </p>


                <input
                    placeholder="Choose Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    style={{
                        width:"90%",
                        padding:"15px",
                        borderRadius:"15px",
                        border:"none",
                        marginTop:"20px",
                        fontSize:"16px",
                        outline:"none"
                    }}
                />


                <button
                    onClick={register}
                    style={{
                        width:"100%",
                        marginTop:"20px",
                        padding:"15px",
                        borderRadius:"20px",
                        border:"none",
                        background:"white",
                        color:"#833ab4",
                        fontSize:"18px",
                        fontWeight:"bold"
                    }}
                >
                    Create Account 🚀
                </button>


                <p style={{marginTop:"25px"}}>
                    Already have account?
                </p>


                <Link to="/">
                    <button
                        style={{
                            width:"100%",
                            padding:"12px",
                            borderRadius:"20px",
                            border:"1px solid white",
                            background:"transparent",
                            color:"white",
                            fontSize:"16px"
                        }}
                    >
                        Login
                    </button>
                </Link>


            </div>

        </div>

    );

}
