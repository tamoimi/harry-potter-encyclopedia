import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Artist } from "../models/types/types";
import { fetchArtistAlbum } from "../libs/api/spotify";
import { useQuery } from "@tanstack/react-query";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { data } = useQuery({
    queryKey: ["artistAlbums", artist.id], // 검색어를 queryKey에 추가
    queryFn: () => fetchArtistAlbum(artist.id), // 검색어를 fetch 함수에 전달
    enabled: !!artist.id, // query 값이 있을 때만 실행
  });

  console.log("data", data);

  return (
    <Card key={artist.id}>
      <CardHeader>
        <CardTitle>{artist.name}</CardTitle>
        <CardDescription>Genres: {artist.genres.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={artist.images[0].url}
          alt={artist.name}
          width={artist.images[0].width}
          height={artist.images[0].height}
        />
      </CardContent>
      <CardFooter>
        <p>Popularity: {artist.popularity}</p>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;
