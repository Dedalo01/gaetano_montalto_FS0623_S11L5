import { useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import {
  addAlbumFavoriteAction,
  addToPlayerAction,
  removeAlbumFavoriteAction,
} from "../redux/actions";

/* let headers = new Headers({
  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  "X-RapidAPI-Key": "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387",
}); */

const url_deezer = "https://deezerdevs-deezer.p.rapidapi.com/album/";
//const url_strive = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const API_KEY_Gaetano = "cd5ce390cbmsh8338260badec5d5p1d8d07jsnaf615db6cd16";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY_Gaetano,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const Album = () => {
  const [albumData, setAlbumData] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const favoriteTracks = useSelector((state) => state.album.albumFavorites);

  useEffect(() => {
    getAlbumData();
  }, []);

  const getAlbumData = async () => {
    //console.log("params", params);
    try {
      const res = await fetch(url_deezer + params.albumId, options);
      //console.log(res);

      if (!res.ok) throw new Error("Cannot fetch data");

      const data = await res.json();
      //console.log("dataAlbumComponent ", data);
      setAlbumData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home albumpage">
      {albumData && (
        <Container className="d-flex align-items-start justify-content-center gap-5">
          <div>
            <Card className="album-card">
              <Card.Img
                src={albumData.cover_medium}
                alt={albumData.title}
                className="song-img"
                variant="top"
              />

              <Card.Body className="text-center">
                <Card.Title>{albumData.title}</Card.Title>
                <Card.Text>{albumData.artist.name}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => {
                    const {
                      cover_small,
                      title,
                      artist: { name },
                    } = albumData;
                    const track = [cover_small, title, name];
                    /*  const track = {
                      cover_small,
                      title,
                      artist,
                    }; */
                    dispatch(addToPlayerAction(track));
                  }}
                >
                  Play
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div>
            {albumData.tracks.data.map((track, i) => {
              const isFavoriteTrack = favoriteTracks.includes(track.title);
              return (
                <div
                  key={i}
                  className=" trackHover d-flex align-content-center justify-content-between"
                >
                  <a
                    onClick={() => {
                      const {
                        title,
                        artist: { name },
                      } = track;
                      const trackData = [albumData.cover_small, title, name];
                      //console.log("trackData Album", trackData);
                      /* const trackData = {
                        cover_small,
                        title,
                        artist,
                      }; */
                      dispatch(addToPlayerAction(trackData));
                    }}
                    className="card-title trackHover px-3"
                  >
                    {track.title}
                  </a>
                  <div className="ms-auto me-4">
                    {isFavoriteTrack ? (
                      <StarFill
                        className="album-star"
                        color="green"
                        size={19}
                        onClick={() =>
                          dispatch(removeAlbumFavoriteAction(track.title))
                        }
                      />
                    ) : (
                      <Star
                        className="album-star"
                        color="white"
                        size={19}
                        onClick={() =>
                          dispatch(addAlbumFavoriteAction(track.title))
                        }
                      />
                    )}
                  </div>
                  <small className="duration">
                    {Math.floor(
                      parseInt(track.duration) / 60 // setting the duration minutes
                    )}
                    :
                    {parseInt(track.duration) % 60 < 10
                      ? "0" + (parseInt(track.duration) % 60) // checking che duration seconds, if they are less than 10 a 0 is prefixed
                      : parseInt(track.duration) % 60}
                  </small>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Album;
