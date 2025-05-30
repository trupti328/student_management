import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { API } from './api';
import Swal from 'sweetalert2';

function StudentTable({ refresh }) {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(1);

    const fetchStudents = async () => {
        try {
            const res = await API.get(`/students/?page=${page}&limit=${limit}`);
            setStudents(res.data.students);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteStudent = async (id) => {
        const confirm = await Swal.fire({
            title: 'Do you want to delete this Student?',
            icon: 'warning',
            showCancleButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-danger me-2',
                cancelButton: 'btn btn-secondary'
            },

        });

        if (confirm.isConfirmed) {
            await API.delete(`/students/${id}`);
            Swal.fire('Deleted!', 'Student has been deleted', 'success');
            fetchStudents();
        }
    };

    const showMarks = async (stu) => {
        try {
            const res = await API.get(`/students/${stu.id}/marks`);
            const scores = res.data.marks;

            if (!scores || scores.length === 0) {
                //score not found
                await Swal.fire({
                    title: `${stu.name}'s Scores`,
                    html: `<p>Scores not available.</p>`,
                    showCancelButton: true,
                    confirmButtonText: 'Add Score',
                    cancelButtonText: 'Close',
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-secondary'
                    },
                    buttonsStyling: false
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await handleAddScores(stu.id);
                    }
                });
            } else {
                // Display scores
                let htmlContent = `<div style="text-align: left;">`;
                scores.forEach((entry) => {
                    htmlContent += `
                    <div style="margin-bottom: 10px;">
                        <label style="font-weight: bold; display: block; margin-bottom: 5px;">${entry.subject}</label>
                        <div style="
                            padding: 8px 12px;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            background-color: #f9f9f9;
                            font-size: 14px;
                            color: #333;
                        ">${entry.score}</div>
                    </div>`;
                });
                htmlContent += `</div>`;

                await Swal.fire({
                    title: `${stu.name}'s Scores`,
                    html: htmlContent,
                    confirmButtonText: 'Close',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                });
            }

        } catch (err) {
            console.error(err.message);
            Swal.fire('Error', 'Failed to fetch scores', 'error');
        }
    };



    const handleAddScores = async (studentId) => {
        let addMore = true;

        while (addMore) {
            const { value: formValues } = await Swal.fire({
                title: 'Add Score',
                html:
                    `<input id="subject" class="swal2-input" placeholder="Subject">` +
                    `<input id="score" type="number" class="swal2-input" placeholder="Score">`,
                focusConfirm: false,
                preConfirm: () => {
                    const popup = Swal.getPopup();
                    const subject = popup.querySelector('#subject').value;
                    const score = popup.querySelector('#score').value;

                    if (!subject || score === '') {
                        Swal.showValidationMessage('Please enter both subject and score');
                        return false;
                    }

                    return { subject, score };
                },
                confirmButtonText: 'Submit',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
            });

            if (formValues) {
                await API.post('/students/marks', {
                    student_id: studentId,
                    subject: formValues.subject,
                    score: formValues.score
                });

                const { isConfirmed } = await Swal.fire({
                    title: 'Score Added!',
                    text: 'Do you want to add another score?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Add More',
                    cancelButtonText: 'Done',
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-secondary'
                    },
                    buttonsStyling: false
                });

                addMore = isConfirmed;
            } else {
                addMore = false;
            }
        }
    };





    const editStudent = async (stu) => {
        const { value: formValues } = await Swal.fire({
            title: 'Edit Student',
            html:
                `<input id="swal-name" class="swal2-input" placeholder="Name" value="${stu.name}">` +
                `<input id="swal-age" type="number" class="swal2-input" placeholder="Age" value="${stu.age}">` +
                `<input id="swal-email" type="email" class="swal2-input" placeholder="Email" value="${stu.email}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const age = document.getElementById('swal-age').value;
                const email = document.getElementById('swal-email').value;
                if (!name || !age || !email) {
                    Swal.showValidationMessage('All fields are required');
                    return false;
                }
                return { name, age, email };
            },
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
        });
        if (formValues) {
            try {
                await API.put(`/students/${stu.id}`, formValues);
                Swal.fire('Success', 'Student updated successfully', 'success');
                fetchStudents();
            } catch (err) {
                console.error(err.message);
                Swal.fire('Error', 'Failed to update student', 'error');
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page, refresh]);

    return (
        <>

            <div className='w-100'>
                <table className='table table-borderd w-100'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Marks</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu) => (
                            <tr key={stu.id}>
                                <td>{stu.id}</td>
                                <td>{stu.name}</td>
                                <td>{stu.age}</td>
                                <td>{stu.email}</td>

                                <td>
                                    <span
                                        className="text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => showMarks(stu)}
                                    >
                                        show marks
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className="text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => editStudent(stu)}
                                    >
                                        Edit
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className="text-danger"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => deleteStudent(stu.id)}
                                    >
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setPage(1)}
                    disabled={page === 1}>
                    first
                </button>
                <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}>
                    prev
                </button>
                <button className="btn btn-primary btn-sm" disabled>
                    {page}
                </button>
                <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}>
                    next
                </button>
                <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}>
                    last
                </button>
            </div>
        </>
    )
}

export default StudentTable