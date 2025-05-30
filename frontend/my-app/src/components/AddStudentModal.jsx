import React, { useState } from 'react'
import { API } from './api'
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function AddStudentModal({ show, handleClose, onAdd }) {
    const [formData, setFormData] = useState({ name: '', email: '', age: '' })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/students/', formData);
            Swal.fire('Success!', 'Member Added Successfully', 'success');
            handleClose();
            onAdd();
            setFormData({ name: '', email: '', age: '' });
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter Name" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Student Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter Email" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Student Age</Form.Label>
                        <Form.Control type="number" name="age" placeholder="Enter Age" required onChange={handleChange} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit" >Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddStudentModal