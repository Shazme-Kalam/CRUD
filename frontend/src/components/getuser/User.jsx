import React, { useEffect, useState } from 'react';
import "./User.css";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://crud-one-eta.vercel.app/api/getall");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`https://crud-one-eta.vercel.app/api/delete/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success("User Removed Successfully", { position: "top-center" });
        } catch (error) {
            console.error("There was an error deleting the user:", error);
            toast.error("Failed to delete user", { position: "top-center" });
        }
    };
    return (
        <div className='userTable'>

            <Link to={"/add"} className='addButton'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={2}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 ? (
                            users.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.fname} {user.lname}</td>
                                        <td>{user.email}</td>
                                        <td className='actionButton'>
                                            <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                            <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                        </td>
                                    </tr>

                                )
                            })
                        ) : (
                            <div className='noData'>No users found. </div>
                        )
                    }

                </tbody>
            </table>

        </div>

    )
}

export default User;