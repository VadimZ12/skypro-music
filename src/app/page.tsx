import { getTracks } from "@/api/track";
import { Main } from "@/components/Main/Main";
import { TrackType } from "@/types/types";

export default async function Home() {
  let tracks: TrackType[] = [];
  let error: string | null = null;
  try {
    tracks = await getTracks();
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков. " + err.message
        : "Неизвестная ошибка";
  }
  return <Main tracks={tracks} />;
}