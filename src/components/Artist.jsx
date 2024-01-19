import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToPlayerAction } from "../redux/actions";

const URL_PROXY_StriveSchool =
  "https://striveschool-api.herokuapp.com/api/deezer/artist";

const BEARER_API_KEY_Gaetano =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDU2NjM1NDgsImV4cCI6MTcwNjg3MzE0OH0.z7Gy4NGIa50t1Nh34KWG9K93cYqc7ywlAA5s7DR_nvY";
const proxy_options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${BEARER_API_KEY_Gaetano}`,
  },
};

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [trackList, setTracklist] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getArtist();
    getTrackList();
  }, []);

  const getArtist = async () => {
    try {
      const res = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
          params.artistId
      );

      if (!res.ok) throw new Error("Cannot fetch data");

      const artist = await res.json();
      //console.log("artist ", artist);
      setArtist(artist);
    } catch (err) {
      console.log(err);
    }
  };

  const getTrackList = async () => {
    const proxyUrl = `${URL_PROXY_StriveSchool}/${params.artistId}/top?limit=20`;
    try {
      const res = await fetch(proxyUrl, proxy_options);
      //console.log("res tracks ", res);

      if (!res.ok) throw new Error("Cannot fetch data");

      const { data } = await res.json();
      //console.log("tracklist " + data);
      setTracklist(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home artistpage pt-5">
      {artist && (
        <Container className="d-flex flex-column align-items-center mb-5">
          <img
            src={artist.picture_medium}
            className="artist-img"
            alt="artista"
          />
          <h1>{artist.name}</h1>
          <div>
            <p>Number of Fans Worldwide: {artist.nb_fan}</p>
          </div>
        </Container>
      )}
      <Container>
        <h2>Tracks</h2>
        <Row className="p-5">
          {trackList &&
            trackList.map((track, i) => (
              <Col key={i} className="col-sm-auto col-md-auto text-center mb-5">
                <Link to={`/album/${track.album.id}`}>
                  <img src={track.album.cover_medium} alt={`album ${i}`} />
                </Link>
                <div className="mt-2 artist-p">
                  <p
                    onClick={() => {
                      const arr = [
                        track.album.cover_small,
                        track.title,
                        track.artist.name,
                      ];
                      dispatch(addToPlayerAction(arr));
                    }}
                  >
                    Track:
                    {track.title.length < 16
                      ? track.title
                      : `${track.title.substring(0, 16)}...`}
                  </p>
                  {/* <p>
                    Album:{" "}
                    {track.album.title.length < 16
                      ? track.album.title
                      : `${track.album.title.substring(0, 16)}...`}
                  </p> */}
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Artist;
