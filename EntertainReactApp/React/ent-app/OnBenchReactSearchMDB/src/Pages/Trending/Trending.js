import { useEffect, useState } from "react";
import CustomPagination from "../../component/Pagination/CustomPagination";
import SingleContent from "../../component/SingleContenet/SingleContent";
import "./Trending.css";


const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const REACT_APP_API_KEY = "55437fe9d30bf24bf0246826adf03179";

    const searchMovies=async()=>{
        const url=`https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`;
        try{
            const res=await fetch(url);
            const data = await res.json();
            console.log(data)
            setContent(data.results)
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => { 
        searchMovies();
        //eslint-disable-next-line
    }, [page]);

    return (
        <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
    )
}
export default Trending
