import axios from "axios";
import type { User } from "..";

async function getBy(userId: number): Promise<User> {
  const { data } = await axios.get<User>(
    `${process.env.API_URL}/users/${userId}`
  );
  return data;
}

async function getAll(): Promise<User[]> {
  const { data } = await axios.get<User[]>(`${process.env.API_URL}/users`);
  return data;
}

export default { getBy, getAll };
