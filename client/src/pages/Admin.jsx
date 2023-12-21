
import React, { useEffect, useState } from "react";
import MakeAdmin from "../Components/admin/MakeAdmin";
import AddUser from "./AddUser";
import { Link } from "react-router-dom";

function Admin() {
    const [users, setUser] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [filterUser, setFilterUser] = useState([])


    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/userlist')
            const data = await response.json()
            // console.log('data--------', data)
            setUser(data);
            setFilterUser(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchUsers()
    }, [])


    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchInput.toLowerCase())
    );

    const searchUser = () => {

        console.log('Filtered Users:', filteredUsers);
        setFilterUser(filteredUsers)
    };

    const handleAdmin = async (userId) => {
        // console.log('username', userId)
        const response = await fetch(`/api/admin/makeadmin/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        fetchUsers()
        const data = await response.json();

        console.log('data after updating', data)
    }

    const handleBlock = async (isBlocked, id) => {
        const response = await fetch(`/api/admin/block/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        fetchUsers()
        // console.log(data)
    }

    return (
        <div className='pt-4 ml-7 mr-7'>
            <div className="mb-3">
                <Link to='/admin/adduser' > <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                    Add User
                </button></Link>

            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 border rounded-md focus:outline-none"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        setFilterUser(users)
                    }}
                />
                <button onClick={searchUser}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Search
                </button>


            </div>

            <div className='pt-4'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead className='bg-slate-300'>
                        <tr>
                            <th className='py-2 px-4 border-b'>User name</th>
                            <th className='py-2 px-4 border-b'>Email</th>
                            <th className='py-2 px-4 border-b'>Role</th>
                            <th className='py-2 px-4 border-b'>Block/Unblock</th>
                            <th className='py-2 px-4 border-b'>Action</th>
                            <th className='py-2 px-4 border-b'>Change Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {

                            filterUser.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='py-2 px-4 border-b text-center'>{item.username}</td>

                                        <td className='py-2 px-4 border-b text-center'>{item.email}</td>
                                        <td className='py-2 px-4 border-b text-center'>{item.role}</td>
                                        <td className='py-2 px-4 border-b text-center'>{item.isBlocked}</td>
                                        <td className='py-2 px-4 border-b text-center'>

                                            <button className='bg-blue-500 text-white px-3 py-1 rounded-md mr-2' onClick={() => handleBlock(item.isBlocked, item._id)}>{item.isBlocked === 'Blocked' ? 'Unblock' : 'Block'}</button>

                                        </td>
                                        <td className='py-2 px-4 border-b text-center'>
                                            <button className='bg-green-500 text-white px-3 py-1 rounded-md' onClick={() => handleAdmin(item._id)}>{item.role === 'Admin' ? 'Revoke admin' : 'Make Admin'}</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

        </div>




    )
}

export default Admin