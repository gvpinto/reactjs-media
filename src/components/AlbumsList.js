import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {

    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if (isLoading) {
        content = (
            <Skeleton times={3} />
        );
    } else if (error) {
        content = (
            <div>Error Loading Albums</div>
        );
    } else {
        content = data.map((album) => {
            const header = <div>{album.title}</div>;
            return (
                <ExpandablePanel key={album.id} header={header}>
                    List of photos in the album
                </ExpandablePanel>
            );
        });
    }



    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Albums for {user.name}</h1>
                <Button onClick={handleAddAlbum}>
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


