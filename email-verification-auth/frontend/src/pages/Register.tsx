import { useState } from "react";
import api from "../api/axios";

const Register = () => {
    const [form, setform] = useState({
        name: "",
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
            const res = await api.post("/auth/register", form);
            alert(res.data?.message || "Registered successfully");

        } catch (err: any) {
            alert(err.response?.data?.message || err.response?.data?.error || "Something went wrong");
        }
    }
    return (
        <>
            <h2>Register</h2>

            <form onSubmit={handelSubmit}>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handelChange}
                    placeholder="Enter name"
                /><br></br>
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

                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register