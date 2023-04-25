import userService from "./user.service";
import externalPhotoService from "./photo.service";
import albumService from "./album.service";
import { nonNullable } from "../utils/validations";
import { applyFilters } from "../utils/filters/applyFilters";

type PhotoFilters = { title: string; albumTitle: string; userEmail: string };

async function getPhoto(photoId: number): Promise<EnrichedPhoto> {
  const photo = await externalPhotoService.getBy(photoId);

  const album = await albumService.getBy(photo.albumId);

  const user = await userService.getBy(album.userId);

  return { ...photo, album: { ...album, user } };
}

async function getPhotos(): Promise<EnrichedPhoto[]> {
  const [photos, albums, users] = await Promise.all([
    externalPhotoService.getAll(),
    albumService.getAll(),
    userService.getAll(),
  ]);

  const albumMap = new Map(albums.map((album) => [album.id, album]));

  const userMap = new Map(users.map((user) => [user.id, user]));

  return photos.map((photo) => {
    const album = albumMap.get(photo.albumId);

    const { albumId, ...restPhoto } = photo;

    if (!album) return restPhoto;

    const user = userMap.get(album.userId);

    const { userId, ...restAlbum } = album;

    if (!user) return { ...restPhoto, album: { ...restAlbum } };

    return { ...restPhoto, album: { ...restAlbum, user } };
  });
}
async function getPhotosBy({
  title,
  albumTitle,
  userEmail,
}: PhotoFilters): Promise<EnrichedPhoto[]> {
  const filters: Filter<EnrichedPhoto>[] = [
    title
      ? (enrichedPhoto: EnrichedPhoto) =>
          enrichedPhoto.title?.includes(title) as boolean
      : undefined,

    albumTitle
      ? (enrichedPhoto: EnrichedPhoto) =>
          enrichedPhoto?.album?.title?.includes(albumTitle) as boolean
      : undefined,
    userEmail
      ? (enrichedPhoto: EnrichedPhoto) =>
          (enrichedPhoto?.album?.user?.email ?? "") === userEmail
      : undefined,
  ].filter(nonNullable);

  const photos = await getPhotos();

  return photos.filter((enrichedPhoto) => applyFilters(filters, enrichedPhoto));
}

export default { getPhoto, getPhotosBy };
