import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';

import history from '../history';
import {fetchTopItems, searchAndFetchItems} from '../actions';
import SearchBar from './SearchBar';
import TabButtons from './TabButtons';
import ItemsList from './ItemsList';
import Item from './ItemDetail';

class App extends React.Component{
    
    state={selectedTabOption: 'movie', searchTerm :''};
    timeout=null;

    componentDidMount(){
        this.props.fetchTopItems(this.state.selectedTabOption);
    }

    fetchResultsOnChange(selectedTabOption, searchTerm){
        if(searchTerm.trim().length < 3){
            this.props.fetchTopItems(selectedTabOption);
        }else{
            this.props.searchAndFetchItems(searchTerm, selectedTabOption);
        } 
    }

    fetchOnSearchTermChange(newSearchTerm){
        if(this.timeout){
            clearTimeout(this.timeout);
        }        
        this.timeout = setTimeout(() => {
            //Do not fetch if the old and new search term length is smaller than 2!!
            this.fetchResultsOnChange(this.state.selectedTabOption, newSearchTerm);
        }, 1000);   
    }

    fetchOnTabChange(newSelectedTabOption){
        this.fetchResultsOnChange(newSelectedTabOption, this.state.searchTerm);
    }

    onInputChange = event => {
        const searchTerm = event.target.value;
        this.fetchOnSearchTermChange(searchTerm);
        this.setState({searchTerm});
    }
 
    changeTab = event =>{
        const selectedTabOption = event.target.value;
        this.fetchOnTabChange(selectedTabOption);
        this.setState({selectedTabOption});
    }
    
    render(){
        return (
            <div className="container"> 
                <Router history = {history}>
                    <Switch> 
                        <Route exact path="/">    
                            <TabButtons selectedTabOption = {this.state.selectedTabOption} changeTab = {this.changeTab}/>
                            <SearchBar searchTerm = {this.state.searchTerm} onInputChange = {this.onInputChange}/>  
                            <ItemsList /> 
                        </Route> 
                        <Route path="/:type/:id" component={Item} />
                    </Switch>
                </Router>       
            </div>
        );
    }
}

export default connect(null, {fetchTopItems, searchAndFetchItems})(App);