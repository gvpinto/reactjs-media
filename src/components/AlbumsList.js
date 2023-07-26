import { useFetchAlbumsQuery } from "../store";
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';

function AlbumsList({ user }) {

    const { data, error, isLoading } = useFetchAlbumsQuery(user);

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
        data.map((album) => {
            const header = <div>{album.title}</div>;
            content = (
                <ExpandablePanel header={header}>
                    List of photos in the album
                </ExpandablePanel>
            );
        });
    }

    return (
        <div>
            <div>
                Albums for {user.name}
            </div>
            <div>
                {content}
            </div>
        </div>
    );
}

export default AlbumsList;


