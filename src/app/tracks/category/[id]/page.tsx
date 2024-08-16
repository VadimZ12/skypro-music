import { getCategoryTracks } from "@/api/tracks";
import Playlist from "@/components/Playlist/Playlist";
import styles from "@components/Centerblock/Centerblock.module.css";

type CategoryType = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryType) {
  const categoryTracks = await getCategoryTracks(params.id);
  console.log(categoryTracks)
  return (
    <div>
      <h2 className={styles.centerblockH2}>{categoryTracks.title}</h2>
      <Playlist tracks={categoryTracks.items} playlist={categoryTracks.items} />
    </div>
  );
}