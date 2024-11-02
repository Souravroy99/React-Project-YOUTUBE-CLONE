import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {

  const {videoId} = useParams()  
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=91&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play_video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "No Title"}</h3>
      <div className="play_video_info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "7B"}{" "}
          &bull;{" "}
          {apiData
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "1000 Years age"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : "7B"}
          </span>
          <span>
            <img src={dislike} alt="" />
            {apiData ? value_converter(apiData.statistics.dislikeCount) : "7B"}
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "No Name"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "7B"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid_description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 251)
            : "STROY Sabka Katega"}
        </p>
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "7B"}{" "}
          Comments
        </h4>

        {commentData.map((item, idx) => {
          return (
            <div key={idx} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span>
                </h3>
                <p>
                  {item.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className="comment_action">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
