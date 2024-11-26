import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// interface ArtistResponse {
//   artists: Artist[];
// }

interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[]; // 장르 배열
  href: string; // 아티스트에 대한 API URL
  id: string; // 아티스트 ID
  images: Image[]; // 이미지 배열
  name: string; // 아티스트 이름
  popularity: number; // 인기 점수 (0-100)
  type: string; // 리소스 타입 (예: "artist")
  uri: string; // Spotify URI
}

interface ExternalUrls {
  spotify: string; // Spotify 웹 URL
}

interface Followers {
  href: string | null; // 팔로워 상세 URL (일반적으로 null)
  total: number; // 팔로워 수
}

interface Image {
  url: string; // 이미지 URL
  height: number; // 이미지 높이
  width: number; // 이미지 너비
}

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET!;

// 토큰 요청 함수
const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Base64 인코딩된 Client ID와 Secret
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await response.json();
  return data.access_token;
};

// 아티스트 데이터 요청 함수
const fetchArtists = async () => {
  const token = await getAccessToken();

  const response = await fetch("https://api.spotify.com/v1/artists?ids=4NHQUGzhtTLFvgF5SZesLK,2BTZIqw0ntH9MvilQ3ewNY", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch artists");
  }

  return response.json();
};

function App() {
  const { data } = useQuery({
    queryKey: ["artists"], // 캐싱 키
    queryFn: fetchArtists, // 비동기 요청 함수
  });

  console.log("data", data);

  return (
    <>
      <div className="grid grid-cols-2">
        {data?.artists.map((d: Artist) => (
          <Card>
            <CardHeader>
              <CardTitle>{d.name}</CardTitle>
              <CardDescription>Genres: {d.genres}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
              <img src={d.images[0].url} />
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default App;
