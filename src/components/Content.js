import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Content = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_VIDEOS_URL).then((data) => {
            setVideos(data.data);
        });
    }, []);

    return (
        <div className="row my-5">
            {videos.map((video) => (
                <div className="col-6 mb-4" key={video.id}>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={video.url}
                            frameborder="0"
                            title={video.name}
                        ></iframe>
                    </div>
                    <p className="mt-3">
                        <Link
                            className="btn btn-primary"
                            to={"/video/" + video.id}
                        >
                            Reviews
                        </Link>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Content;
