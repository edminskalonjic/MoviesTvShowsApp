import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchItem} from '../actions'; 

class ItemDetail extends React.Component{
    
    componentDidMount(){
        const {id, type} = this.props.match.params;

        if(!this.props.item){
            this.props.fetchItem(id, type);
        }
    }

    renderCardBody(item){
        return(
            <div className="card-body">
                <h5 className="card-title">{item.title ? item.title : item.name}</h5>
                <p className="card-text">{item.overview}</p>
            </div>
        );
    }
    
    renderContent(){
        const {item} =this.props;

        //If there is no trailer, load car with a image
        if(!item.videos.results[0]){
            const imgURL = `https://image.tmdb.org/t/p/w500${item.backdrop_path ? item.backdrop_path : item.poster_path}`
            return(
                <div className="card" style={{marginTop:'30px', marginBottom:'30px'}}>
                    <img src={imgURL} height="580" className="card-img-top" alt="..." />
                    {this.renderCardBody(item)}
                </div>
            );
        }

        const youtubeURL=`https://www.youtube.com/embed/${item.videos.results[0].key}`;
        return(
            <div className="card"  style={{marginTop:'30px', marginBottom:'30px'}}>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" title="video-player" src={youtubeURL} ></iframe>
                </div>
                {this.renderCardBody(item)}
            </div>
        );
    }

    renderButton(){
        return(
            <Link to="/" type="button" className="btn btn-light" style={{marginTop:'25px', width:'150px'}}>
                <i className="fas fa-angle-left" style = {{marginRight:'10px'}}> </i>
                Back
            </Link>
        );
    }

    render(){
        if(!this.props.item){
            return null;
        }
        return (
            <div>
                {this.renderButton()}
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = ({item}) => {
    return {item};
}

export default connect(mapStateToProps, {fetchItem})(ItemDetail);