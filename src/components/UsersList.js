import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import { useThunk } from '../thunks/use-thunk';
import Button from './Button';
import Skeleton from './Skeleton';

function UsersList() {

    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = (event) => {
        doCreateUser();
    };

    const { data } = useSelector((state) => {
        return state.users;
    });

    let content;
    if (isLoadingUsers) {
        content = (
            <Skeleton times={6} className="h-10 w-full" />
        );
    } else if (loadingUsersError) {
        content = (
            <div>
                Error fetching data...
            </div>
        );
    } else {
        content = data.map((users) => {
            return (
                <div key={users.id} className="mb-2 border rounded">
                    <div className="flex p-2 justify-between items-center cursor-pointer">
                        {users.name}
                    </div>
                </div>

            );
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    + Add User
                </Button>
            </div>
            {content}
        </div>
    );
}

export default UsersList;