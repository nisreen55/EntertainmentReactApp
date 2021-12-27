import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { img_500, unavailable, unavailableLandscape } from "../../Config/Config";
import axios from 'axios';
import './ContentModal.css';
import { useState, useEffect} from 'react';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from "../Carousel/Carousel";
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
        },
}));

export default function ContentModal({ children, media_type, id }) {
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const [videoname, setVideoname] = useState();
    const [favorite, setFavorite] = useState(false);
    const [movie, setMovie] = useState([]);
    const [favoritemovie, setFavoritemovie] = useState([]);

    const [email, setEmail] = useState("");
    const [umovieid, setUmovieid] = useState("");
    const { user, logout } = useContext(UserContext);
    const REACT_APP_API_KEY = "55437fe9d30bf24bf0246826adf03179";
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [trailerUrl, setTrailerUrl] = useState("");

    const fetchDataModal=async()=>{
        const url=`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${REACT_APP_API_KEY}&language=en-US`;
        try{
         const res=await fetch(url);
         const data = await res.json();
         console.log(data);
         setContent(data);
        }
        catch(err){
         console.error(err)
        }
    }

    const fetchVideoModal=async()=>{
         const url1=`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${REACT_APP_API_KEY}&language=en-US`;
         try{
             const res1=await fetch(url1);
             const data1 = await res1.json();
             console.log("videos   :"+data1.results[0]?.key+" name :"+data1.results[0]?.name);
             setVideo(data1.results[0]?.key);
             setVideoname(data1.results[0]?.name);
             setFavoritemovie(data1.results[0]);
         }
         catch(err){
             console.error(err)
         }
    };

    useEffect(() => { 
        fetchDataModal();
        fetchVideoModal();
        //eslint-disable-next-line
    }, [id]);
    
    const addFavorite = async () => {
        setEmail(user.name);
        setUmovieid(content.movieid);
        console.log(" banner , movie name :" + content?.id);
        console.log("user is:" + user.name);
        if (!favorite) {
            const axiosPayLoad1 = await axios.post('http://localhost:8080/newuserlist'
                , {
                    "email": user.name,
                    "movieid": content?.id,
                    "movieurl": "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}",
                    "movietitle": content?.title,
                    "moviename": content?.name,
                    "movieoriginalname": content?.originalname,
                }
            );
            const axiosData1 = axiosPayLoad1.data;
            console.log("axiosdata for user movies list : ", content);
            console.log("movie url : ", content?.backdrop_path);
            console.log("movie id : ", content?.id);
        }
        else
        {
            const axiosPayLoad1 = await axios.post('http://localhost:8080/deleteuserlist'
                , {
                    "email": user.name,
                    "movieid": content?.id,
                    "movieurl": "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}",
                    "movietitle": content?.title,
                    "moviename": content?.name,
                    "movieoriginalname": content?.originalname,
                }
            );
            const axiosData1 = axiosPayLoad1.data;
            console.log("axiosdata for user movies list : ", content);
            console.log("movie url : ", content?.backdrop_path);
            console.log("movie id : ", content?.id);
        }
        setFavorite(!favorite);
    }
  return (
    <div>
        <div
            className="media"
            style={{ cursor: "pointer" }}
            color="inherit"
            onClick={handleOpen} >
            {children}
        </div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }} >
            <Fade in={open}>
                {content && (
                <div className={classes.paper}>
                    <div className="ContentModal">
                        <img
                            src={
                            content.poster_path
                            ? `${img_500}/${content.poster_path}`
                            : unavailable
                            }
                            alt={content.name || content.title}
                            className="ContentModal__portrait" />
                        <img
                            src={
                            content.backdrop_path
                            ? `${img_500}/${content.backdrop_path}`
                            : unavailableLandscape
                            }
                            alt={content.name || content.title}
                            className="ContentModal__landscape"  />
                        <div className="ContentModal__about">
                            <span className="ContentModal__title">
                                {content.name || content.title} (
                                {(
                                    content.first_air_date ||
                                    content.release_date ||
                                    "-----"
                                    ).substring(0, 4)}
                                )
                            </span>
                                  
                            {content.tagline && (
                                <i className="tagline">{content.tagline}</i>
                            )}
                            <span className="ContentModal__description">
                                {content.overview}
                            </span>
                            <div>
                                <Carousel id={id} media_type={media_type} />
                            </div>
                            <Button
                                style={{fontSize:"12px"}}
                                variant="contained"
                                startIcon={<YouTubeIcon />}
                                color="secondary"
                                target="__blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                            >
                                Watch the Trailer
                                  </Button>
                                  { !favorite ? (  
                                    <Button
                                        style={{fontSize:"12px"}}
                                        variant="contained"
                                        startIcon={<FavoriteIcon  />}
                                        color={favorite ? "secondary" : "white"}                                      target="__blank"
                                        onClick={() => addFavorite()}>
                                        Add To Favorite
                                    </Button>
                                    ) :
                                    (  
                                    <Button
                                        style={{fontSize:"12px", fontWeight:"bold"}}
                                        variant="contained"
                                        startIcon={<FavoriteIcon  />}
                                        color={favorite ? "secondary" : "white"}                                      target="__blank"
                                        onClick={() => addFavorite()}>
                                        Remove From Favorite
                                    </Button>
                                    )}
                        </div>
                    </div>
                </div>
                )}                                  
            </Fade>
        </Modal>
    </div>
    );
}