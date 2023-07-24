import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Button from './Button';
import Skeleton from './Skeleton';


function UsersList() {

    const dispatch = useDispatch();
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);

    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUserError, setCreatingUserError] = useState(false);

    useEffect(() => {

        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            // unwrap is to ensure success invokes then and failer a catch.
            .unwrap()
            .catch((err) => setLoadingUsersError(err))
            .finally(() => setIsLoadingUsers(false));

    }, [dispatch]);

    const handleUserAdd = (event) => {

        setIsCreatingUser(true);

        dispatch(addUser())
            .unwrap()
            .catch((err) => setCreatingUserError(err))
            .finally(() => setIsCreatingUser(false));
    };

    const { data } = useSelector((state) => {
        return state.users;
    });

    if (isLoadingUsers) {
        return (
            <Skeleton times={6} className="h-10 w-full" />
        );
    }

    if (loadingUsersError) {
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
                {isCreatingUser ? "Creating User" :
                    <Button onClick={handleUserAdd}>
                        + Add User
                    </Button>
                }
                {creatingUserError && "Error Creating a User"}
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;