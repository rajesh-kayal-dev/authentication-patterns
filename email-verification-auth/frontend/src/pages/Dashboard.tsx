import { useEffect, useState } from "react"
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/");
                    return;
                }
                
                const res = await api.get("/auth/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data.user);

            } catch (error) {
                navigate('/')
            }
        };

        fetchData();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <div>
            <h2>Dashboard</h2>
            {user && (
                <>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
