import React, { useEffect, useState } from "react"
import axios from "axios"

const Dashboard = () => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [createdAt, setCreatedAt] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/getuser")

        setId(res.data.id)
        setName(res.data.name)
        setEmail(res.data.email)
        setCreatedAt(res.data.created_at)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUser()
  }, []) 

  return (
    <div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Created At: {createdAt}</p>
    </div>
  )
}

export default Dashboard
