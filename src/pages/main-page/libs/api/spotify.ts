import axios from "axios";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// Axios 인스턴스 생성
const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Access Token 요청 함수
export const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
    {
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    }
  );

  return response.data.access_token;
};

// 아티스트 데이터 요청 함수
export const fetchArtists = async () => {
  const token = await getAccessToken();
  const response = await spotifyApi.get("/artists", {
    params: { ids: "4NHQUGzhtTLFvgF5SZesLK,2BTZIqw0ntH9MvilQ3ewNY" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
