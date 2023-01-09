function Character(character) {
    return (
        <div className='col-3 mb-5'>
            <div className='card'>
                <img
                    src={character.image}
                    alt={character.name}
                    className='card-img-top'
                />
            </div>
            <div className="card-body">
                <h3 className="card-title">{character.name}</h3>
                <p>{`Origin: ${character.origin && character.origin.name}`}</p>
                <p>{`Status: ${character.status}`}</p>
                <span>{`Episodes: `}</span> {character.episode}
            </div>
        </div>
    );
}

export default Character;