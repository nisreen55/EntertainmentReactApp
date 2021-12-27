import React, {useState} from 'react';

 function ServicesMovies(){

    const [query,setQuery]=useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies=async(e)=>{
        e.preventDefault()
        const url=`https://api.themoviedb.org/3/movie/550?api_key=55437fe9d30bf24bf0246826adf03179&language=en-US&query=${query}&page=1&include_adult=false`;
        try{
            const res=await fetch(url);
            const data = await res.json();
            console.log(data)
            setMovies(data.results)
        }
        catch(err){
            console.error(err)
        }
    }
    
    
     return (
        <div>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.map(movie => movie.title)}
            </div>    
        </div>
    )
}

export default ServicesMovies;
