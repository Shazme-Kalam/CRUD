import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import "./add.css";
import { RiArrowGoBackLine } from "react-icons/ri";

const Add = () => {

    const users = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    }


    const [user, setUser] = useState(users);
    const navigate = useNavigate();


    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser({ ...user, [name]:value});
        console.log(user);
    }

    const submitForm = async(event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('https://crud-one-eta.vercel.app/api/create', user);
            console.log(response);
            toast.success('User Added Successfully.', { position: 'top-center' });
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.', { position: 'top-center' });
        };
    };

    return (
        <div className='addUser'>
              <Link to="/" style={{ color: 'green', fontSize: '24px' }}> 
            <RiArrowGoBackLine />
        </Link>
            <h3>Add new user</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='fname'>First Name</label>
                    <input type='text' onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='First Name' />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='lname'>Last Name</label>
                    <input type='text' onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Last Name' />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='email@.com' />
                </div>

                <div className='inputGroup'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Write your Password here' />
                </div>

                <div className='inputGroup'>
                    <button type='submit'>Add User</button>
                </div>
            </form>

        </div>
    )
}

export default Add;