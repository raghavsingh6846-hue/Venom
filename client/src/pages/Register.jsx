import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
                "http://127.0.0.1:3000/auth/register",
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

            alert("Server Error");

        }

    }

    return (

        <div style={{ padding: 30, textAlign: "center" }}>

            <h1>Venom Register</h1>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    width: 260,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <br />

            <button onClick={register}>
                Register
            </button>

            <p>

                <Link to="/">
                    Login
                </Link>

            </p>

        </div>

    );

}
