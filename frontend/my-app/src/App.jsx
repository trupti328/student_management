import { useState } from 'react'
import './App.css'
import Button from "react-bootstrap/Button";
import StudentTable from './components/StudentTable'
import AddStudentModal from './components/AddStudentModal'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className='container-fluid'>
      <h3>Student Portal</h3>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <input type='text' className='form-control w-25' placeholder='Search...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant='success' onClick={handleShow} >Add New Student</Button>
      </div>

      <StudentTable refresh={refresh} searchText={searchText} />

      <AddStudentModal
        show={showModal}
        handleClose={handleClose}
        onAdd={triggerRefresh} />

    </div>
  )
}

export default App
