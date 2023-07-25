import { useThunk } from '../hooks/use-thunk';
import { GoTrash } from 'react-icons/go';
import { removeUser } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {

    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = (
        <>
            <Button className='mr-3' onClick={handleClick} loading={isLoading}>
                <GoTrash />
            </Button>
            {error && "Error deleting user"}
            {user.name}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;