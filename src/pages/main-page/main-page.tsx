import { useQuery } from "@tanstack/react-query";
import { ArtistResponse } from "./models/types/types";
import { fetchArtists } from "./libs/api/spotify";
import ArtistCard from "./components/artists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  const { data, isLoading, isError } = useQuery<ArtistResponse>({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading artists.</p>;

  return (
    <>
      <div className="flex items-center w-full max-w-sm space-x-2">
        <Input placeholder="Artist" />
        <Button type="submit">Search</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data?.artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
};

export default Home;
