import { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SingleContent from "../../component/SingleContenet/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";


const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState("");
    const [numOfPages, setNumOfPages] = useState();
    const REACT_APP_API_KEY = "55437fe9d30bf24bf0246826adf03179";

    const darkTheme = createTheme({
        pallette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    const fetchData = async () => {
        // e.preventDefault()
        console.log("for search " + searchText);
        const url =
             `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setContent(data.results);
            setNumOfPages(data.total_pages);
        }
        catch (err) {
            console.error(err)
        }
    }
 
    useEffect(() => {
        window.scroll(0, 0)
        fetchData();
        //eslint-disable-next-line
    }, [type, page]);
    return (
        <div >
            <div >
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        className="search"
                        inputProps={{ style: { fontFamily: 'Arial', color: 'white', fontSize:"20px"}}}
                        style={{ flex: 1}}
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginLeft: 10 }}
                        onClick={fetchData}>
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs  value={type}
                    indicatorColor="primary"
                       textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: 5 }}>
                    <Tab style={{ width: "50%" , color: 'white', fontSize:"20px"}} label="Search Movies"></Tab>
                    <Tab style={{ width: "50%" , color: 'white', fontSize:"20px"}} label="Search TV Series"></Tab>
                </Tabs>
            </div>
            <div className="trending">
                {
                    content && content.map((c) => (
                        <SingleContent
                            key={c.id} id={c.id} poster={c.poster_path}
                            title={c.title || c.name} date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"} vote_average={c.vote_average}
                        />
                    ))
                }
                {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
            <CustomPagination setPage={setPage} />
        </div>
    );
};

export default Search
