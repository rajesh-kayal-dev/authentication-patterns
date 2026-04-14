import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const [form, setform] = useState({
        email: "",
        password: ""
    })
    const handelChange = (e: any) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handelSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);

            navigate("/dashboard")

        } catch (err: any) {
            alert(err.response?.data?.message);
        }
    }
    return (
        <>
            <h2>Login</h2>

            <form onSubmit={handelSubmit}>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handelChange}
                    placeholder="Enter email"
                /><br></br>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handelChange}
                    placeholder="Enter password"
                /><br></br>

                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login