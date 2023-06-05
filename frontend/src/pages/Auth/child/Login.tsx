import React from "react"
import { login } from "../../../https";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IUser, setAuth } from "../../../redux/slice/authSlice";
import { toast } from "react-hot-toast";
function Login({ setAuthType }: IAuthProp) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = React.useState<IUserLogin>({
        email: "",
        password: ""
    })
    const handleLogin = async () => {
        try {
            const res = await login(user)

            console.log(res);
            const loggedUser: IUser = {
                username: res.data.user.username as string,
                email: res.data.user.email as string
            }

            if (res.status === 200) {
                dispatch(setAuth(loggedUser))
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
                return toast.success("User logged in.")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
            console.log(error);

        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={(e) => setUser({
                                    ...user,
                                    [e.target.name]: e.target.value
                                })} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setUser({
                                    ...user,
                                    [e.target.name]: e.target.value
                                })} />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLogin}>Login</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" onClick={() => setAuthType("signup")}>Sign up</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login