import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";

const Genres = ({ 
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {

    const REACT_APP_API_KEY = "55437fe9d30bf24bf0246826adf03179";

    const handleAdd = (genre) => { 
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => { 
        setSelectedGenres(
        selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    }
    const fetchGenres=async()=>{
        // e.preventDefault()
         const url=`https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`;
         try{
             const res=await fetch(url);
             const data = await res.json();
             console.log(data);
             setGenres(data.genres);
             //setNumOfPages(data.total_pages);
         }
         catch(err){
             console.error(err)
         }
     }
 
     useEffect(() => { 
         fetchGenres();
         return () => {
             setGenres({});
         };
         //eslint-disable-next-line
     }, []);
 
    return (
        <div style={{ padding: "6px 0" , fontStyly:"bold" }}>
            { selectedGenres && selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2}}
                    label={genre.name}
                    size="medium"
                    color="primary"
                    key={genre.id}
                    clickable
                    onDelete={ ()=> handleRemove(genre)}
                />
            ))}
            { genres && genres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    size="small"
                    key={genre.id}
                    clickable
                    onClick={ ()=> handleAdd(genre)}
                />
             ))}
        </div>
    )
}

export default Genres
