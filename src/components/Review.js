import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Review = () => {
    const { id } = useParams();

    const [video, setVideo] = useState({ url: null, name: null });
    const [recs, setRecs] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_VIDEOS_URL + "/" + id).then((data) => {
            setVideo(data.data);
        });

        axios.get(process.env.REACT_APP_REVIEWS_URL + "/" + id).then((data) => {
            setRecs(data.data);
        });
    }, []);

    const postHandler = (e) => {
        e.preventDefault();

        const data = {
            rating: e.target.rating.value,
            comment: e.target.text.value,
            videoId: id,
        };

        axios.post(process.env.REACT_APP_REVIEWS_URL + "/add", data);

        setRecs([data, ...recs]);
    };

    return (
        <div className="pb-4">
            <div className="ratio ratio-16x9 mt-4">
                <iframe src={video.url} title={video.name}></iframe>
            </div>

            <form
                className="bg-secondary p-3 mt-4 text-light"
                onSubmit={postHandler}
            >
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        Rating
                    </label>
                    <input
                        type="range"
                        id="rating"
                        className="form-range"
                        min="1"
                        max="5"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">
                        Leave your reivew here
                    </label>
                    <textarea
                        name="text"
                        id="text"
                        cols="30"
                        rows="10"
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-outline-light">
                    Submit
                </button>
            </form>
            {recs.length ? (
                <ol className="list-group mt-4 list-group-numbered">
                    {recs.map((rec) => (
                        <li
                            className="list-group-item d-flex justify-content-between align-items-start"
                            key={rec.videoId}
                        >
                            <div className="ms-2 me-auto">{rec.comment}</div>
                            <span className="badge bg-primary rounded-pill">
                                {rec.rating}
                            </span>
                        </li>
                    ))}
                </ol>
            ) : (
                ""
            )}
        </div>
    );
};

export default Review;
