export interface ArtistResponse {
  artists: Artist[];
}

export interface Artist {
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
