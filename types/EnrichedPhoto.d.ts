interface EnrichedPhoto extends Partial<Photo> {
  album?: Partial<Album> & { user?: User };
}

type Filter<T> = (enrichedPhoto: T) => boolean;
