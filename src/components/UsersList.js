import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Button from './Button';
import Skeleton from './Skeleton';


function UsersList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleUserAdd = (event) => {
        dispatch(addUser());
    };

    const { data, isLoading, error } = useSelector((state) => {
        return state.users;
    });

    if (isLoading) {
        return (
            <Skeleton times={6} className="h-10 w-full" />
        );
    }

    if (error) {
        return (
            <div>
                Error fetching data...
            </div>
        );
    }

    const renderedUsers = data.map((users) => {
        return (
            <div key={users.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {users.name}
                </div>
            </div>

        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleUserAdd}>
                    + Add User
                </Button>
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;