import React from "react";
import { MdAddModerator } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosSecure from "../../../Hooks/axiosSecure";
import { GrUserAdmin } from "react-icons/gr";

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
            confirmButtonColor: "#0000FF",
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
    const handleModerator = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Do you want to make him Moderator?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0000FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes."
        }).then((result) => {
            if (result.isConfirmed) {
                // 
                axiosSecurity.patch(`/m-users/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Added To Moderator.",
                                text: "Your made this user an Moderator.",
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
                            <tr className="bg-blue-600 text-white w-full">
                                <th className="py-2 px-4">#</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4 text-center">Role</th>
                                <th></th>
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
                                    <td className="py-2 px-4 text-center flex items-center justify-between">


                                        {
                                            user.role == 'admin' ?
                                                <p className="text-center">ADMIN</p> :
                                                <button
                                                    onClick={() => handleAdmin(user._id)}
                                                    className="btn btn-xs btn-outline btn-info">
                                                    <GrUserAdmin /> <span className="hidden md:block"> Make Admin</span>
                                                </button>
                                        }



                                        {user.role != 'moderator' ? <button
                                            onClick={() => handleModerator(user._id)}
                                            className={`btn btn-xs btn-outline btn-success ${user.role == 'admin' && 'hidden'}`}>
                                            <MdAddModerator /> <span className="hidden md:block">Make Moderator</span>
                                        </button> : <p className="text-center">Moderator</p>}


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


