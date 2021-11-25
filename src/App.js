import React, { Component, useState } from 'react';
import './App.css';

/**
 * Main component
 *
 * @state  {array}   gistData    Contains all objects fetched from Gist API. Updated on scroll of List
 * @state  {int}     gPage       Controls pagination of fetch request. Increments on every fetch request
 * @state  {string}  etag        Used as header in fetch request to ensure same data isn't downloaded twice
 * @state  {bool}    allowFetch  Throttles fetch request to prevent multiple fetchs being called on scroll
 *
 * @return {JSX} List
 */
export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gistData: [],
            gPage: 1,
            etag: '',
            allowFetch: true
            // lastRequest: '2011-10-05T14:48:00.000Z'
        }
    }

    componentDidMount() {
        this.getGists(20);
    }
    
    getGists = (limit=20) => {

        if (this.state.allowFetch) {
            // Prevent fetch from firing again until current fetch has resolved
            this.setState({ allowFetch: false });
            
            const API_URL = `https://api.github.com/gists/public?page=${this.state.gPage}&per_page=${limit}`; //&since=${this.state.lastRequest}`;

            fetch(API_URL,{
                method: 'GET',
                cache: 'default',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'If-None-Match': this.state.etag
                }
            })
            .then(response => {
                // Extract Header's etag for use in subsequent requests
                const etag = response.headers.get('etag') || '';
                this.setState({ etag });

                if (response.ok) {
                    // All good
                    return response.json();
                }
                else if (response.status === 304) {
                    // Nothing new so don't update
                    return [];
                }
                else if (response.status === 403) {
                    // Rate limit has been exceeded
                    throw new Error('Rate limit exceeded. Try again in an hour: ' + response.status);
                }
                else {
                    // Error occurred
                    throw new Error('Response status = ' + response.status);
                }
            })
            .then(data => {
                // Concatenate new data into gistData
                const newGistData = [];
                newGistData.push(...this.state.gistData, ...data);

                this.setState({
                    allowFetch: true,
                    gistData: newGistData,
                    gPage: this.state.gPage + 1
                    // lastRequest: new Date().toISOString()
                });
            })
            .catch(error => {
                const errorMessage = 'Sorry an error has occured: ' + (error.message || '');
                // Output error message onto list
                this.setState({
                    allowFetch: true,
                    gistData: [
                        {
                            'owner': {
                                'avatar_url': 'https://upload.wikimedia.org/wikipedia/commons/3/34/ErrorMessage.png'
                            },
                            'files': {
                                [errorMessage]: {}
                            }
                        }
                    ]
                });
            });
        }
    }

    render() {
        return (
            <div className='App'>
                <List gistData={this.state.gistData}
                      allowFetch={this.state.allowFetch}  
                      getGists={this.getGists} />
            </div>
        )
    }
}


/**
 * A List containing all the data objects fetched from the Gist API.
 *
 * @param  {array}   gistData    Contains objects fetched from Gist API
 * @param  {bool}    allowFetch  True if fetch is allowed. False indicates fetch in progress
 * @param  {func()}  getGists()  Fetches Gist API and updates gistData
 *
 * @return {JSX} ListItems, Loading Icon and Big Avatar Image
 */
function List({gistData, allowFetch, getGists}) {
    // Using hooks to show/hide clicked gist Avatar
    const [showAvatar, setShowAvatar] = useState(false);
    const [avaUrl, setAvaUrl] = useState('');
    
    var scrollList = (e) => {
        const { clientHeight, scrollHeight, scrollTop } = e.target;

        // User has scrolled to bottom of content
        if (scrollHeight - clientHeight <= scrollTop + 300) { // 300 pixel buffer from end
            // Update gistData with new fetch
            getGists(20);
        }
    }

    var handleGistClicked = (srcUrl) => {
        // Update big Avatar image src and display big Avatar on screen
        setAvaUrl(srcUrl);
        setShowAvatar(true);
    }

    return(
        <div className='main' onScroll={scrollList}>
            <ul className='list' >
                {
                    // Extract and concatenate all file names into string
                    // Extract Avatar url from owner property
                    gistData.map((gist, i) => {
                        const fileNames = Object.keys(gist.files).join(' ');
                        /*
                        const fileNames = '';
                        for (let f in gist.files) {
                            fileNames += gist.files[f].filename + ' ';
                        }
                        */
                        return (
                            <ListItem key={i}
                                      avatarUrl={gist.owner.avatar_url}
                                      fileNames={fileNames}
                                      handleGistClicked={handleGistClicked} />
                        )
                    })
                }
                {
                    // Display loading icon if fetch is in progress
                    (allowFetch) ? null : <ListItemLoading /> 
                }
            </ul>
            {/* Avatar is hidden off screen until ListItem is clicked*/}
            <Avatar showAvatar={showAvatar} 
                    avaUrl={avaUrl}
                    setShowAvatar={setShowAvatar} />
        </div>
    );
}


/**
 * A ListItem contianing the file name/s and avatar icon of a Gist.
 *
 * @param  {string}  avatarUrl    src of Gist Avatar image
 * @param  {string}  fileNames    All file names contained in Gist
 * @param  {func()}  handleGistClicked()   Updates big Avatar image src
 *
 * @return {JSX} An LI contianing an IMG and P
 */
function ListItem({avatarUrl, fileNames, handleGistClicked}) {
    return (
        <li className='list__item'
            onClick={() => handleGistClicked(avatarUrl)}>
            <img className='list__item__avatar' 
                 src={avatarUrl} 
                 alt='User avatar' />
            <p className='list__item__text'>{fileNames}</p>
        </li>
    )
}


/**
 * A ListItemLoading containing a loading gif
 *
 * @return {JSX} An LI contianing a loading gif IMG
 */
function ListItemLoading() {
    return (
        <li className='list__item list__item--loading'>
            <img className='list__item__loading-icon'
                 src='https://i.gifer.com/ZZ5H.gif' 
                 alt='Loading icon' />
        </li>
    )
}


/**
 * Display the owner's Avatar in the centre of screen when list item clicked
 *
 * @param  {bool}    showAvatar      true to show Avatar image
 * @param  {string}  avaUrl          src of Avatar image
 * @param  {func()}  setShowAvatar() update showAvatar after image transition ends
 * 
 * @return {JSX} An IMG
 */
function Avatar({showAvatar, avaUrl, setShowAvatar}) {
    return (
        <img className={`large-icon ${showAvatar ? 'large-icon--reveal' : 'large-icon--hide'}`}
             src={avaUrl} 
             alt='Owner avatar icon' 
             onTransitionEnd={() => setShowAvatar(false)} />
    )
}

export default App;