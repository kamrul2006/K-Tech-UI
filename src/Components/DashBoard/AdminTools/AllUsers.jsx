import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axiosSecure from "../../../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecurity = axiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecurity.get('/users')
            return res.data
        }
    })


    // ---------handle delete user--------
    const handleAdmin = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure want to make this user Admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00FF00",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Make Admin."
        }).then((result) => {
            if (result.isConfirmed) {
                // 
                axiosSecurity.patch(`/users/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Added To admin.",
                                text: "Your made this user an admin.",
                                icon: "success"
                            });

                            refetch()
                        }
                    });
            }
        });
    }

    // ---------handle delete user--------
    const handleDelete = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure want to delete this User?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // 
                axiosSecurity.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            refetch()
                        }
                    });
            }
        });
    }

    return (
        <div className="p-10 bg-gray-300 min-h-screen">
            <div className="p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Total Users: {users.length}
                </h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border-collapse border">
                        <thead>
                            <tr className="bg-yellow-600 text-white">
                                <th className="py-2 px-4">#</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Role</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        }`}
                                >
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">
                                        {
                                            user.role == 'admin' ?
                                                <p>ADMIN</p> :
                                                <button
                                                    onClick={() => handleAdmin(user._id)}
                                                    className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700">
                                                    <FaUserFriends />
                                                </button>
                                        }


                                    </td>

                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;


