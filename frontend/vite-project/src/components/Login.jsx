import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [generatedPass, setGeneratedPass] = useState("")
  const [errors, setErrors] = useState({})

  const backendUrl = "http://localhost:5000/admin"

  // ✅ validation
  const validate = () => {
    const err = {}

    if (!email) err.email = "Email required"
    if (isRegister) {
      if (!name) err.name = "Name required"
      if (!phone) err.phone = "Phone required"
      else if (!/^\d{10}$/.test(phone)) err.phone = "Phone must be 10 digits"
    } else {
      if (!password) err.password = "Password required"
    }

    setErrors(err)
    return Object.keys(err).length === 0
  }

  // ✅ submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      if (isRegister) {
        const res = await axios.post(`${backendUrl}/create`, {
          name,
          phone,
          email
        })

        setGeneratedPass(res.data.password)
        alert("Admin registered successfully")
      } else {
        await axios.post(`${backendUrl}/login`, {
          email,
          password
        })

        alert("Admin login successful")
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-lg w-[350px]">
        <h2 className="text-xl font-bold text-center mb-4">
          {isRegister ? "Admin Registration" : "Admin Login"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded"
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          {!isRegister && (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </>
          )}

          <button
            type="submit"
            className={`text-white p-2 rounded ${
              isRegister ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {isRegister ? "Register Admin" : "Login"}
          </button>
        </form>

        {/* ✅ show generated password */}
        {generatedPass && (
          <div className="mt-4 bg-green-100 p-3 rounded">
            <p className="font-bold">Generated Password:</p>
            <p className="text-green-700">{generatedPass}</p>
            <p className="text-sm text-red-600 mt-1">
              Save this password. It will not be shown again.
            </p>
          </div>
        )}

        <button
          className="mt-4 text-blue-600 text-sm"
          onClick={() => {
            setIsRegister(!isRegister)
            setGeneratedPass("")
          }}
        >
          {isRegister ? "Already have an account?" : "Create Admin Account"}
        </button>
      </div>
    </div>
  )
}

export default Login
