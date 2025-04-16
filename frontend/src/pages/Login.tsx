import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login } from "../lib/api";


const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirectUrl = location.state?.redirectUrl || '/'

    const {
        mutateAsync: signIn,
        isPending,
        isError
    } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            alert('Login Successful')
            navigate(redirectUrl, { replace: true })
        },
        onError: () => {
            console.log(isError)
        }
    })


    return (
        <section className="flex p-0 m-0 flex-col md:flex-row items-center h-screen">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img src="/login-img.jpg" alt="" className="w-full h-full object-fill" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

                <div className="w-full h-100">
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                    <form className="mt-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email" name="" id="email" placeholder="Enter Email Address"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 
                                focus:bg-white focus:outline-none" autoComplete="true" autoFocus required
                                onKeyDown={
                                    (event) => event.key === "Enter" && signIn({ email: email, password: password })
                                } />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type="password" name="" id="password" placeholder="Enter Password" min="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required
                                onKeyDown={
                                    (event) => event.key === "Enter" && signIn({ email: email, password: password })
                                } />
                        </div>

                        {isError && <label className="block text-red-500 font-sans text-sm mt-2">Incorrect Email or password</label>}

                        <button type="button" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6" onClick={
                                () => signIn({ email: email, password: password })
                            }>
                            {isPending ? "Loading" : "Log In"}
                        </button>

                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                        <div className="flex items-center justify-center">
                            <span className="ml-4">
                                Log in with Google
                            </span>
                        </div>
                    </button>

                    <p className="mt-8">Need an account? <a href="/register" className="text-blue-500 hover:text-blue-700 font-semibold" >Create an account</a></p>

                </div>
            </div>

        </section>

    )
}

export default Login;
