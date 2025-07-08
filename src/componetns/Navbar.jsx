import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/");
    }

    return (
        <>
        <header className='p-2 shadow'>
            <div className='d-flex align-items-center justify-content-between'>
                <h4>ToDo App</h4>
                <div className="d-flex gap-3">
                    { location.pathname === "/dashboard" ?
                        (
                            <Link to="/">
                                <button className="btn btn-primary" >Home</button>
                            </Link>
                        ): token &&
                        (
                            <Link to="/dashboard">
                                <button className="btn btn-primary" >Dashboard</button>
                            </Link>

                        )
                    }

                    {token == null ?
                        (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-primary  ">Login</button>
                                </Link>
                            </>
                        ) :
                        (
                            <>
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </>
                        )
                    }

                </div>
            </div>
        </header>
        </>
    )
}

export default Navbar