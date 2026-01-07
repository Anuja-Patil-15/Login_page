import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [role, setRole] = useState("")
    const [login, setLogin] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [errors, setErrors] = useState({})
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

    const backendUrl = "http://localhost:5000/admin"

    const validate = () => {
        const newErrors = {}

        if (!role) newErrors.role = "Role is required"

        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format"
        }

        if (login) {
            if (!name) newErrors.name = "Name is required"

            if (!contact) {
                newErrors.contact = "Contact number is required"
            } else if (!/^\d{10}$/.test(contact)) {
                newErrors.contact = "Contact must be exactly 10 digits"
            }
        } else {
            if (!password) newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        if (login) {
  try {
    const res = await axios.post(`${backendUrl}/create`, {
      role,
      name,
      phone: contact,
      email, 
    })

    setPass(res.data.password)
    alert("Registration successful. Save the password.")

  } catch (err) {
    alert("Registration failed")
  }
}

        else {
            try {
                const res = await axios.post(`${backendUrl}/login`, {
                    email,
                    password,
                    role
                })

                localStorage.setItem("role", res.data.role)

                alert("Login successful")

                if (res.data.role === "Admin") {
                    navigate("/dashboard")
                } else {
                    navigate("/login")
                    alert("You are not authorized to access dashboard")
                }

            } catch (err) {
                alert("Login failed")
            }

        }

    }

    const inputStyle =
        "border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-2">
            <div className="flex flex-col border-2 border-black shadow-lg bg-white rounded-lg 
        w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] xl:w-[25%] p-4">


                <div className="flex justify-around mb-4">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1"
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Desk">Desk</option>
                        <option value="Agent">Agent</option>
                    </select>

                </div>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    {login ? (
                        <>
                            <h2 className="font-bold text-center">Register</h2>

                            <input className={inputStyle} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            <input className={inputStyle} placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
                            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}

                            <input className={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                            <button className="bg-blue-500 text-white py-2 rounded">Register</button>

                            {pass && (
                                <div className="mt-2 text-center">
                                    <p className="font-bold">Generated Password</p>
                                    <p className="text-green-600">{pass}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <h2 className="font-bold text-center">Login</h2>

                            <input className={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                            <input className={inputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                            <button className="bg-green-500 text-white py-2 rounded">Login</button>
                        </>
                    )}
                </form>

                <button className="mt-4 text-blue-600 text-sm" onClick={() => setLogin(!login)}>
                    {login ? "Already have an account?" : "Create new account"}
                </button>
            </div>
        </div>
    )
}

export default Login
