import React from 'react';

const SearchBar = ({searchTerm, onInputChange}) =>{
    const renderSearchBar = () =>{
        return(
            <React.Fragment>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <input 
                value={searchTerm} 
                onChange = {onInputChange} 
                type="text" 
                className="form-control" 
                placeholder="search"
                aria-label="search" 
                aria-describedby="basic-addon1"
                 />
            </React.Fragment>
        );
    }

    return (
        <div className="input-group mb-3" style={{marginTop:'15px'}}>
            {renderSearchBar()}
        </div>
    );   
}

export default SearchBar;