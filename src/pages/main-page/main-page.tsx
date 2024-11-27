import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ArtistCard from "./components/artists";
import { fetchArtists } from "./libs/api/spotify";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 사용자 입력 값을 저장
  const [query, setQuery] = useState(""); // 실제 검색에 사용할 값

  const { data, isLoading, isError } = useQuery({
    queryKey: ["artists", query], // 검색어를 queryKey에 추가
    queryFn: () => fetchArtists(query), // 검색어를 fetch 함수에 전달
    enabled: !!query, // query 값이 있을 때만 실행
  });

//test
  const handleSearch = () => {
    setQuery(searchTerm); // 검색 버튼 클릭 시 query 값 설정
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading artists.</p>;

  return (
    <>
      <div className="flex items-center w-full max-w-sm mb-10 space-x-2">
        <Input
          placeholder="Artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 사용자 입력 값 업데이트
        />
        <Button onClick={handleSearch} type="button">
          Search
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data?.artists.items.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
};

export default Home;
