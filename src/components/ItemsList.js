import React from 'react';
import {connect} from 'react-redux';

import {fetchItem} from '../actions'; 

class ItemsList extends React.Component{

    editDescription(videoOverview){
        return videoOverview.substring(0,70) + '...';
    }

    fetchItem(id, type){
        this.props.fetchItem(id, type);
    }

    renderSearchResults(){
        const imgURL = 'https://image.tmdb.org/t/p/w500';
        const type = this.props.items.type;
        
        return this.props.items.searchResults.map(video => {
            return (    
                <div 
                 onClick={() =>this.fetchItem(video.id, type)}
                 key={video.id}
                 className="card col-sd-6"
                 style = {{width:'16rem', height:'550px', cursor:'pointer', margin:'10px'}}
                 >
                    <img 
                    src={`${imgURL}${video.poster_path ? video.poster_path : video.backdrop_path}`} 
                    className="card-img-top" alt="..." 
                    />
                        <div className="card-body">
                            <h5 className="card-title">
                                {video.title ? video.title : video.name}
                            </h5>
                            <p className="card-text">
                                {this.editDescription(video.overview)}
                            </p>
                        </div>
                </div>       
            );
        })
    }

    render(){
        if(!this.props.items){
            return null;
        }
        return(

            <div className="row"  style={{display:'flex', textAlign:'center', alignItems:'stretch', marginTop:'30px'}}>
                {this.renderSearchResults()}
            </div>
        );
    }
}

const mapStateToProps = ({items}) =>{
    return {items};
}

export default connect(mapStateToProps, {fetchItem})(ItemsList);