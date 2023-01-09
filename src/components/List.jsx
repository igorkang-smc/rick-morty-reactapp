import Character from "./Character.jsx";
import {useEffect, useState} from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight} from "react-icons/all.js";


function List() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }
    const paginate = (array, page_size, page_number) => {
        return array.slice((page_number - 1) * page_size - 1 > 0 ? (page_number - 1) * page_size - 1 : (page_number - 1) * page_size, page_number * page_size);
    }

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
            const {results, info} = await data.json();
            setTotalPages(info.pages);
            setTotalRecords(info.count);
            setCharacters(results);
            setLoading(false);
        }

        fetchData();
    }, [characters.length, currentPage])

    const getEpisodePathName = (episode) => {
        let path = '';
        if (episode <= 11) {
            path = `s:1-e:${episode}`
        } else if (episode > 11 && episode <= 21) {
            path = `s:2-e:${episode - 11}`
        } else if (episode > 21 && episode <= 31) {
            path = `s:3-e:${episode - 21}`
        } else if (episode > 31 && episode <= 41) {
            path = `s:4-e:${episode - 31}`
        } else if (episode > 41 && episode <= 51) {
            path = `s:5-e:${episode - 41}`
        }

        return path;
    }

    const getEpisodeString = (episodes, id) => {
        if (episodes.length > 1) {
            episodes = [episodes[0], episodes[episodes.length - 1]];
        }
        let episodesArr = [];
        episodes.map(episode => {
            const href = episode.substring(episode.lastIndexOf('/') + 1);
            episodesArr.push(href);
        });

        let episodesPath = getEpisodePathName(episodesArr[0]);

        return (<a href={`https://rezka.ag/cartoons/comedy/2136-rik-i-morti-2013.html#t:238-${episodesPath}`}>{episodesArr.toString()}</a>);
    }

    return (
        <div>
            <h2>{`Characters (Total: ${totalRecords})`}</h2>
            <div className='row'>
                {loading ? (<div>Loading ... </div>) : (
                    characters.map(character => {
                        const episodeString = getEpisodeString(character.episode, character.id);
                        return (
                            <Character
                                key={character.id}
                                name={character.name}
                                origin={character.origin}
                                image={character.image}
                                status={character.status}
                                episode={episodeString}
                            />
                        )
                    })
                )}
            </div>
            <div className="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination d-flex justify-content-center">
                        <li onClick={() => changePage(1)} className="page-item"><a
                            className="page-link"><AiOutlineDoubleLeft/></a></li>
                        <li onClick={() => changePage(currentPage - 1)} className="page-item"><a className="page-link"
                                                                                                 href="#"><AiOutlineArrowLeft/></a>
                        </li>
                        {paginate([...Array(totalPages).keys()], 5, Math.floor(currentPage / 5) + 1).map((pageNum) => (
                            <li onClick={() => changePage(pageNum + 1)} key={pageNum}
                                className={`page-item ${currentPage === pageNum + 1 ? 'active' : ''}`}><a
                                className="page-link" href="#">{pageNum + 1}</a></li>)
                        )}
                        <li onClick={() => changePage(currentPage + 1)} className="page-item"><a className="page-link"
                                                                                                 href="#"><AiOutlineArrowRight/></a>
                        </li>
                        <li onClick={() => changePage(totalPages)} className="page-item"><a
                            className="page-link"><AiOutlineDoubleRight/></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default List;