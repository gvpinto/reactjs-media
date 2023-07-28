import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumListItem from './AlbumsListItem';

function AlbumsList({ user }) {

    // Replacing isLoading with isFetching since isFetching is true 
    // everytime the data is fetched
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if (isFetching) {
        content = (
            <Skeleton className="h-10 w-full" times={3} />
        );
    } else if (error) {
        content = (
            <div>Error Loading Albums</div>
        );
    } else {
        content = data.map((album) => {
            return (<AlbumListItem key={album.id} album={album} />);
        });
    }


    return (
        <div>
            <div className="flex flex-row items-center justify-between m-2">
                <h3 className="font-bold text-lg">Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
                    + Add Album
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
}


export default AlbumsList;


