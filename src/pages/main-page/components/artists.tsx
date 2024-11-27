import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Artist } from "../models/types/types";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
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
