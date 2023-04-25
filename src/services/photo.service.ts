import axios from "axios";
import type { Photo } from "..";

async function getBy(photoId?: number): Promise<Photo> {
  const { data } = await axios.get<Photo>(
    `${process.env.API_URL}/photos/${photoId}`
  );
  return data;
}
async function getAll(): Promise<Photo[]> {
  const { data } = await axios.get<Photo[]>(`${process.env.API_URL}/photos`);
  return data;
}

export default { getBy, getAll };
