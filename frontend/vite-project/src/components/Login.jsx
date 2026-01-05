import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [role, setRole] = useState("")
  const [login, setLogin] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [errors, setErrors] = useState({})
  const [pass, setPass] = useState("")

  const backendUrl = "http://localhost:5000"

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
        const response = await axios.post(`${backendUrl}/create`, {
          name: name,
          phone: contact,
          email: email,
          role: role
        })

        setPass(response.data.password)
      } catch (error) {
        console.log(error)
        alert("Registration failed")
      }
    } else {
      try {
        await axios.post(`${backendUrl}/login`, {
          email: email,
          password: password,
          role: role
        })

        alert("Login successful")
      } catch (error) {
        console.log(error)
        alert("Login failed")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col border-2 border-black shadow-lg bg-white rounded-lg w-[25%] p-4">
        <div className="roles flex items-center justify-around mb-4">
          <label>
            <input type="radio" name="role" value="admin" onChange={(e) => setRole(e.target.value)} />
            Admin
          </label>
          <label>
            <input type="radio" name="role" value="desk" onChange={(e) => setRole(e.target.value)} />
            Desk
          </label>
          <label>
            <input type="radio" name="role" value="agent" onChange={(e) => setRole(e.target.value)} />
            Agent
          </label>
        </div>
        {errors.role && <p className="text-red-500">{errors.role}</p>}

        <form onSubmit={handleSubmit}>
          {login ? (
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Register</h2>

              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <p className="text-red-500">{errors.name}</p>}

              <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
              {errors.contact && <p className="text-red-500">{errors.contact}</p>}

              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Register
              </button>

              {pass && (
                <div className="mt-2">
                  <p className="font-bold">Generated Password:</p>
                  <p className="text-green-600">{pass}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Login</h2>

              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <p className="text-red-500">{errors.password}</p>}

              <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Login
              </button>
            </div>
          )}
        </form>

        <button className="mt-4 text-blue-600" onClick={() => setLogin(!login)}>
          {login ? "Already have an account?" : "Create new account"}
        </button>
      </div>
    </div>
  )
}

export default Login
