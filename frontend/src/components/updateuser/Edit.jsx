import React, { useEffect, useState } from 'react';
import "../adduser/add.css";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Edit = () => {
    const users = {
        fname: "",
        lname: "",
        email: ""

    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    }
    useEffect(() => {
        axios.get(`https://crud-one-eta.vercel.app/getone/${id}`)
            .then((response) => {
                setUser(response.request)
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    },[id])

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.put(`http://crud-one-eta.vercel.app/update/${id}`, user)
            .then((response) =>{
                console.log(response)
                toast.success("User Updated Successfully" , {position: "top-center"})
                navigate("/")
            }).catch(error => console.log(error))
    }

    return (
        <div>
            <div className='addUser'>
                <Link to={"/"}>Back</Link>
                <h3>Update user</h3>
                <form className='addUserForm' onSubmit={submitForm}>
                    <div className='inputGroup'>
                        <label htmlFor='fname'>First Name</label>
                        <input type='text' value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' autoComplete='off' placeholder='First Name' />
                    </div>

                    <div className='inputGroup'>
                        <label htmlFor='lname'>Last Name</label>
                        <input type='text' value={user.lname} onChange={inputChangeHandler} id='lname' name='lname' autoComplete='off' placeholder='Last Name' />
                    </div>

                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' value={user.email} onChange={inputChangeHandler} id='email' name='email' autoComplete='off' placeholder='email@.com' />
                    </div>

                    <div className='inputGroup'>
                        <button type='submit'>Update</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Edit;