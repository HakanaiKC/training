import { useEffect, useState, useCallback, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth/authServices";
import { jwtDecode } from "jwt-decode";

type Decode_Token = {
    id: number,
    fullName: string;
    role: number;
};


function AuthComponent({ children }: any) {
    const [token, setToken] = useState<string>("");
    const [userID, setUserID] = useState<number>(0)
    const navigate = useNavigate();
    const location = useLocation();

    function checkLogin() {
        const token = AuthService.getToken()
        if (AuthService.getToken()) {
            const decode = jwtDecode(token)

            navigate("/contacts")
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <div> {children}</div>
    );
};
export default AuthComponent