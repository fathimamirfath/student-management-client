
import React, { useState ,useEffect} from 'react'
import axios from "axios"
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();

  const [student,setStudent] = useState([])

  // ✅ STATES
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState({})
  const [editId, setEditId] = useState(null)

  // const API_URL = "http://localhost:3000/api/students"
  const API_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/students`)
      setStudent(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/students/${id}`)
      fetchStudents()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = (item) => {
    setEditStudent(item)
    setEditId(item._id)
    setShowModal(true)
  }

  const handleChange = (e) => {
    setEditStudent({
      ...editStudent,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/api/students/${editId}`, editStudent)
      fetchStudents()
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className='dash-bg container-fluid'>

    <div className='row justify-content-center'>
      <div className='col-12 col-md-11 col-lg-10'>

        <div className='border'>

          <div className='heading d-flex flex-column flex-md-row justify-content-between align-items-center gap-2'>
            <h1 className='text-center text-md-start'>Student Dashboard</h1>
            <button onClick={() => navigate("/addstudent")}>
              Add Student
            </button>
          </div>

          <div className='stud-table'>
            <div className='stud-head-items table-responsive'>

              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Phone</th>
                    <th>Enrollment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {student.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.course}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.enrollmentdate}</td>
                      <td className="d-flex flex-column flex-md-row gap-2">
                        <button
                          className='edit-btn'
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>

                        <button
                          className='delete-btn'
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>
    </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <div className="modal-header">
              <h2>Edit Student</h2>
              <span className="close-btn" onClick={() => setShowModal(false)}>×</span>
            </div>

            <form onSubmit={handleUpdate} className="modal-form">

              <div className="modal-group">
                <label>Name</label>
                <input
                  name="name"
                  value={editStudent.name || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-group">
                <label>Email</label>
                <input
                  name="email"
                  value={editStudent.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-group">
                <label>Course</label>
                <input
                  name="course"
                  value={editStudent.course || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-group">
                <label>Phone</label>
                <input
                  name="phonenumber"
                  value={editStudent.phonenumber || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-group">
                <label>Date</label>
                <input
                  type="date"
                  name="enrollmentdate"
                  value={editStudent.enrollmentdate || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="update-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard