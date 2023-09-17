

const SearchResults = (occupations) => {
    if (occupations.occupations == undefined) {
        return null;
    }
    console.log(occupations);
    
    return (
        <>
        <div>Sökresultat</div>
        </>
    )
}

export default SearchResults;