import React, { useState } from 'react'
// import axios from "axios"
import axios from "axios"
import './Addstudent.css'

// const API_URL = "http://localhost:3000/api/students"
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Addstudent = () => {

  const [errors, setErrors] = useState({})
  const [student,setStudent] = useState({
    name: '',
    email: '',
    course:'',
    phonenumber:'',
    enrollmentdate:''
  })

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const handleAddStudent = async (e) => {
    e.preventDefault()
console.log("handleAddStudent");

    if (!validate()) return

    try {
      const res = await axios.post(`${API_URL}/api/students`, student)
      console.log(res.data)

      alert("Student Added ")

      setStudent({
        name: '',
        email: '',
        course:'',
        phonenumber:'',
        enrollmentdate:''
      })

    } catch (error) {
      console.log(error)
    }
  }

  const validate = () => {
  let newErrors = {}

  if (!student.name.trim()) newErrors.name = "Name is required"

  if (!student.email.trim()) {
    newErrors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(student.email)) {
    newErrors.email = "Invalid email"
  }

  if (!student.course) newErrors.course = "Select a course"

  if (!student.phonenumber) newErrors.phonenumber = "Phone is required"

  if (!student.enrollmentdate) newErrors.enrollmentdate = "Date required"

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

  return (
    <div className='stud-add-bg'>
        <div className='add-stud-border'>
            <div className='add-stud-head'>
                <h1>Add Student</h1>
            </div>
            <form onSubmit={handleAddStudent}>
                <div className='stud-form'>
            <div className="form-row">
            <div className="form-group">
            <label> Name:</label>
            <input className="p-text" name="name" type="text" 
            placeholder='Enter full name' onChange={handleChange}/>
            {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
          </div>
          </div>
          <div className="form-row">
            <div className="form-group">
            <label>Email:</label>
            <input className="p-text" name="email" type="text" 
            placeholder='Enter email' onChange={handleChange}/>
            {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
          </div>
          </div>
          
           <div className="form-row">
          <div className="form-group">
            <label>Course:</label>
            <select 
            className="p-text" 
            name="course" 
            onChange={handleChange}
>
           <option value="">Select Course</option>
           <option value="CS">CS</option>
           <option value="Commerce">Commerce</option>
           <option value="Biology">Biology</option>
           <option value="chemistry">Chemistry</option>
          </select>
          {errors.course && <p style={{color:"red"}}>{errors.course}</p>}
            </div>   
            </div>       
            <div className="form-row">
            <div className="form-group">
            <label>Phone Number:</label>
            <input className="p-text" name="phonenumber" type="number" 
            placeholder='Enter phone number' onChange={handleChange}/>
            {errors.phonenumber && <p style={{color:"red"}}>{errors.phonenumber}</p>}
          </div>
          </div>
          <div className="form-row">
            <div className="form-group">
            <label>Enrollment Date:</label>
            <input className="p-text" name="enrollmentdate" type="date" 
            placeholder='Enter Date' onChange={handleChange}/>
            {errors.enrollmentdate && <p style={{color:"red"}}>{errors.enrollmentdate}</p>}
          </div>
          </div>
          </div>
            <div className="form-actions">
      <button className="save-btn" onClick={() => navigate("/dashboard")}>Save</button>
    </div>
          </form>
        </div>
    </div>
  )
}

export default Addstudent