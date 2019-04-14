import React from 'react';

const TabButtons = ({selectedTabOption, changeTab}) =>{
    const activeClass = 'btn btn-secondary active';
    const notActiveClass = 'btn btn-secondary';
    const BUTTONS =  [
        {option : 'movie',label:'Movies'},
        {option : 'tv',label:'TV Shows'}
    ];
    const renderButtons = () =>{
        return(
            BUTTONS.map(({option,label}) => {
                return(
                    <label 
                    key={option}
                    className={selectedTabOption===option ? activeClass: notActiveClass}
                    style = {{cursor:'pointer'}}
                    >
                        <input 
                        type="radio" 
                        name="options" 
                        value={option} 
                        onClick={changeTab} 
                        autoComplete="off" 
                        /> {label}
                    </label>
                );
            })    
        );
    }
    return(
        <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{marginTop:'25px'}}>
            {renderButtons()}
        </div> 
    );
}

export default TabButtons;