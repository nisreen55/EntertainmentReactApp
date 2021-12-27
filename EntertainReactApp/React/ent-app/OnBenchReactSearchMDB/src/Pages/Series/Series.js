import { useEffect, useState } from "react";
import useGenres from "../../hooks/useGenres";
import Genres from "../../component/Genres";
import SingleContent from "../../component/SingleContenet/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";

const Series = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);
    const REACT_APP_API_KEY = "55437fe9d30bf24bf0246826adf03179";

    const fetchSeries=async()=>{
        // e.preventDefault()
         const url=`https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`;
         try{
             const res=await fetch(url);
             const data = await res.json();
             console.log(data);
             setContent(data.results);
             setNumOfPages(data.total_pages);
         }
         catch(err){
             console.error(err)
         }
     }
 
     useEffect(() => { 
         fetchSeries();
         //eslint-disable-next-line
     }, [page,genreforURL]);
    return (
        <div>
            <span className="pageTitle"> TV Series </span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
                genres={genres} setGenres={setGenres}
                setPage={ setPage}
            />
            <div className="trending">
            { 
                content && content.map((c) => (
                    <SingleContent
                        key={c.id} id={c.id} poster={c.poster_path}
                        title={c.title || c.name} date={c.first_air_date || c.release_date}
                        media_type="tv" vote_average={ c.vote_average}
                    />
                ))
            }
            </div>
            { numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
    </div> 
    )
}
export default Series
