import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchResults from "./SearcResults";
//const key = "cd5ce390cbmsh8338260badec5d5p1d8d07jsnaf615db6cd16";

/* const previous_key = "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0";

const strive_key = "1c9a44634bmshc420986a1ca9d4bp149ee4jsn6c74b6ea3e35";
const strive_key_try =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDU2MTQ1MDMsImV4cCI6MTcwNjgyNDEwM30.t8M4Jwgg_Rm4Gre_EOBaKtKy3Yv5fa6WOL6e31fVZBw";

const headers = {
  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  "X-RapidAPI-Key": strive_key_try,
  "Content-Type": "application/json",
}; */

const urlStrive = `https://striveschool-api.herokuapp.com/api/deezer`;
//const urlDeezer = `https://deezerdevs-deezer.p.rapidapi.com`;

const Gallery = ({ genre, artistsList }) => {
  const [artists, setArtists] = useState([]);
  /*  const [arrayArtist, setArrayArtist] = useState(); */

  const handleArtist = async (artistName) => {
    try {
      const response = await fetch(`${urlStrive}/search?q=${artistName}`);
      if (response.ok) {
        const result = await response.json();
        //console.log("result ", result);
        const songInfo = result.data[0];
        //console.log("song info ", songInfo);

        setArtists((artists) => [...artists, songInfo]);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRandomArtistsArr = (artistsArr) => {
    let randomArtistsArr = [];
    while (randomArtistsArr.length < 4) {
      const artist = artistsArr[Math.floor(Math.random() * artistsArr.length)];
      if (!randomArtistsArr.includes(artist)) {
        randomArtistsArr.push(artist);
      }
    }

    return randomArtistsArr;
  };

  useEffect(() => {
    //console.log("useEffect fired");
    setArtists([]);
    let randomArtists = getRandomArtistsArr(artistsList);

    //console.log(randomArtists);

    randomArtists.forEach((artist) => {
      setTimeout(async () => {
        await handleArtist(artist);
      }, 700);
    });
  }, []);

  return (
    <Container className="mt-5">
      <h2>{genre}</h2>

      {artists && (
        <Row>
          {artists.map((song, i) => {
            return <SearchResults key={i} song={song} />;
          })}
        </Row>
      )}
    </Container>
  );
};
export default Gallery;
