import tracks from "./tracks.json";
import artists from "./artists.json";

export const discoverPlaylist = (likedGenres, dislikedGenres, argFeatures) => {
  let features = Object.keys(argFeatures).map((name) => argFeatures[name]);

  let choosenTracks = [];
  for (const track of tracks) {
    const otherFeatures = track[4];
    const distance = getDistance(features, otherFeatures);
    choosenTracks.push({ id: track[0], distance: distance, artistNames: track[2], trackName: track[1] });
  }
  choosenTracks.sort((a, b) => a.distance - b.distance);

  let counter = 0;
  let playlist = [];
  for (let track of choosenTracks) {
    if (counter >= 30) break;

    const genres = getTrackGenres(track.artistNames);
    if (checkIntersection(likedGenres, genres) && !checkIntersection(dislikedGenres, genres)) {
      playlist.push(track);
      counter++;
    }
  }
  return playlist;
};

const checkIntersection = (list1, list2) => {
  for (let a of list1)
    for (let b of list2)
      if (a.toLowerCase().includes(b.toLowerCase())) return true;

  return false;
}

const getDistance = (features, other) => {
  const filtered = [other[1] * 10, other[2] * 10, other[5] * 10, other[6] * 10, other[7] * 10, other[8] * 10, other[9] * 10, other[10] * 10];
  let distance = 0;

  for (let i = 0; i < features.length; i++) {
    distance += (features[i] - filtered[i]) ** 2;
  }
  return Math.sqrt(distance);
}

const getTrackGenres = (artistNames) => {
  let genres = [];
  for (let artistName of artistNames) {
    const found = artists.find((artist) => artist[0] === artistName);
    if (found) genres = [...genres, ...found[1]];
  }
  return genres;
};

export const getAllGenres = () => {
  let genres = new Set();
  for (let artist of artists) {
    for (let g of artist[1]) genres.add(g);
  }

  return Array.from(genres).sort();
}