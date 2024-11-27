import axios from "axios";
import { ArtistApiResponse } from "../../models/types/types";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// Axios 인스턴스 생성
const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Access Token 요청 및 설정
const setAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
    {
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const accessToken = response.data.access_token;

  // Axios 인스턴스에 Authorization 헤더 추가
  spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// 아티스트 데이터 요청 함수
export const fetchArtists = async (query: string): Promise<ArtistApiResponse> => {
  // Access Token 설정
  if (!spotifyApi.defaults.headers.common["Authorization"]) {
    await setAccessToken();
  }

  // Spotify API 요청
  const response = await spotifyApi.get(`/search`, {
    params: {
      q: query,
      type: "artist",
    },
  });

  return response.data;
};
