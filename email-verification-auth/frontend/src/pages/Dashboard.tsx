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

            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <span>Logout</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
            </button>
        </div>
    )
}

export default Dashboard
