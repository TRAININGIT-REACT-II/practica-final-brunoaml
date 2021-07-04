import { useContext, useEffect } from "react";
import useApi from "./useApi";
import User from "../contexts/user";

const useUser = () => {
    const user = useContext(User);
    const request = useApi("/api/register", "", {}, false);
    useEffect(() => {
        console.log(registerRequest.loading);
        if (!registerRequest.loading && registerRequest.data != undefined) {
            console.log(registerRequest.data);
            user.update(registerRequest.data);
        }
    }, [registerRequest.loading]);
    useEffect(() => {
        console.log(loginRequest.loading);
        if (!loginRequest.loading && loginRequest.data != undefined) {
            console.log(loginRequest.data);
            user.update(loginRequest.data);
        }
    }, [loginRequest.loading]);

    const register = (username,  password) => {
        registerRequest.updateParams({
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        registerRequest.perform();
    };
    const login = (username,  password) => {
        loginRequest.
        loginRequest.updateParams({
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        loginRequest.perform();
    };
    return {
        register,
        login
    };
};

export default useUser;