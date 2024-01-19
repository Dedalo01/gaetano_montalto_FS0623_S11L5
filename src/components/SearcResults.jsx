import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchResults = ({ song }) => {
  return (
    <Col xs={3}>
      <Link to={`album/${song.album.id}`}>
        <img
          src={song.album.cover_medium}
          alt={song.album.title}
          className="song-img"
        />
      </Link>
      <div className="song-text mt-1 mb-3 text-center">
        <Link to={`album/${song.album.id}`}>
          Album:{" "}
          {song.album.title.length < 16
            ? song.album.title
            : song.album.title.substring(0, 16) + "..."}
        </Link>
        <br />
        <Link to={`artist/${song.artist.id}`}>Artist: {song.artist.name}</Link>
      </div>
    </Col>
  );
};

export default SearchResults;
