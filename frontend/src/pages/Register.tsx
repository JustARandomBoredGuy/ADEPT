import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../lib/api";


const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {
        mutateAsync: createAccount,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            alert('New account created successfully.')
            navigate('/', { replace: true })
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
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Create an account</h1>

                    <form className="mt-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email" name="" id="email" placeholder="Enter Email Address"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 
                                focus:bg-white focus:outline-none" autoComplete="true" autoFocus required
                                onKeyDown={
                                    (event) => event.key === "Enter" && createAccount({ email:email, password:password, confirmPassword:confirmPassword })
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
                                    (event) => event.key === "Enter" && createAccount({ email:email, password:password, confirmPassword:confirmPassword })
                                } />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                            <input value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyDown={
                                    (event) => event.key === "Enter" && createAccount({ email:email, password:password, confirmPassword:confirmPassword })
                                }
                                type="password" name="" id="confirmPassword" placeholder="Enter Password" min="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required />
                        </div>

                        {isError && <label className="block text-red-500 font-sans text-sm mt-2">{error?.message || "An error occured"}</label>}

                        <button type="button" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6" onClick={
                                () => createAccount({ email:email, password:password, confirmPassword:confirmPassword })
                            }>
                            {isPending ? "Loading" : "Register"}
                        </button>

                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <p className="mt-8">Have an existing account? <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold" >Sign in</a></p>

                </div>
            </div>

        </section>

    )
}

export default Register;
