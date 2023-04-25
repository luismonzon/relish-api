import axios from "axios";

async function getBy(albumId?: number): Promise<Album> {
  const { data } = await axios.get<Album>(
    `${process.env.API_URL}/albums/${albumId}`
  );
  return data;
}

async function getAll(): Promise<Album[]> {
  const { data } = await axios.get<Album[]>(`${process.env.API_URL}/albums/`);
  return data;
}

export default { getBy, getAll };
