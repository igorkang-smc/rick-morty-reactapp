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
        console.log(page_number)
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

    const getEpisodeString = (episodes, id) => {
        if (episodes.length > 5) {
            episodes = episodes.slice(episodes.length - 5, episodes.length);
        }
        let episodesArr = [];
        episodes.map(episode => {
            const href = episode.substring(episode.lastIndexOf('/') + 1);
            episodesArr.push(href);
        });

        return (<a target='_blank' href={`https://rickandmortyapi.com/api/character/${id}`}>{episodesArr.toString()}</a>);
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