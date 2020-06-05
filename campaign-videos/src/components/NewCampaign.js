import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import { feathersClient } from '../feathersClient'

class NewCampaign extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            title: '',
            description: '',
            blobs: [],
            videos: [],
        }
    }

    recordVideo(e) {
        e.preventDefault()

        var self = this
        window.clipchamp({
            title: 'Create new campaign video',
            output: 'blob',
            enable: [
                'no-thank-you',
                'no-user-retry', 
                // 'mobile-webcam-format-fallback'
            ],
            onVideoCreated: function (blob) {
                self.setState(prevState => {
                    const blobs = prevState.blobs.slice(0)
                    blobs.push(blob)
                    console.log(blobs)
                    return {blobs}
                })
            },
            onErrorOccurred: function(err) {
                console.log(err)
            }
        }).open()
    }

    uploadVideo(e) {
        e.preventDefault()

        // var self = this
        const { name, description } = this.state

        if (!this.state.blobs)
            return

        window.clipchamp({
            title: 'Uploading, please wait...',
            inputs: ['direct'],
            direct: { files: this.state.blobs },
            output: 'youtube',
            enable: [
                'batch',
                'no-user-retry',
                'no-thank-you',
            ],
            youtube: {
                title: name,
                description: description
            },

            onUploadComplete: function (video) {
                console.log(video)
                // self.props.history.goBack()
            },
            onErrorOccurred: function(err) {
                console.log(err)
            }
        }).open()
    }

    uploadVideoToYoutube(e){
        e.preventDefault()
        
        var self = this
        const { name, description } = this.state

        window.clipchamp({
            title: 'Upload video from file or webcam to Youtube',
            output: 'youtube',
            enable: [
                'no-user-retry',
                'no-thank-you',
            ],
            youtube: {
                title: name,
                description: description
            },

            onUploadComplete: function (video) {
                console.log(video)
                self.setState(prevState => {
                    const videos = prevState.videos.slice(0)
                    videos.push(video.id)
                    return {videos}
                })
            },
            onErrorOccurred: function(err) {
                console.log(err)
            }
        }).open()
    }

    saveCampaign() {
        const { name, description, videos } = this.state

        feathersClient.service('campaigns').create({name, description, videos})
        this.props.history.push('/')
    }

    onChange() {
        this.setState({name:this.refs.name.value, description:this.refs.description.value})
    }

    render() {
        const { name, description, videos } = this.state
        const opts = {
            playerVars: {
                mute: 1,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                playsinline: 0,
                playlist: 'mjUsobGWhs8,HkZDSqyE1do,wW9w6eCQQkU,vpTHi7O66pI,NFBo5bj1tfU',
            }
        }

        return (
            <div className="container-fluid page-layout">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <div className="form-group">
                            <Link to="/">
                                <div className="svg-icon svg-baseline">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                                        <path d="M0-.5h24v24H0z" fill="none"/>
                                    </svg>
                                </div>
                                Back to my home view
                            </Link>
                        </div>
                        <br />

                        <h2>Create new campaign</h2> <br />

                        <form onSubmit={this.saveCampaign.bind(this)} onChange={this.onChange.bind(this)}>
                            <div className="form-group d-flex">
                                <label htmlFor="name" className="col-form-label"> Campaign name:</label> &nbsp;
                                <input
                                    className="form-control"
                                    style={{flex:1}}
                                    name="name"
                                    ref="name"
                                    type="text"
                                    value={name}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description"> Campaign description: </label>
                                <br />
                                <textarea
                                    className="form-control"
                                    style={{width:'100%', resize:'none'}}
                                    rows="7"
                                    name="description"
                                    ref="description"
                                    type="text"
                                    value={description}
                                    required
                                />
                            </div>

                            <label> Videos: </label> <br />
                            {/* {
                                this.state.blobs.map(blob => {
                                    return <video key={blob.name} src={window.URL.createObjectURL(blob)} controls></video>
                                })
                            } */}
                                    <YouTube
                                        className="d-flex"
                                        opts={opts}
                                    />

                            {
                                videos.map(video => {
                                    return <YouTube
                                        key={video}
                                        videoId={video}
                                        opts={opts}
                                    />
                                })
                            }
                            
                            <div className="form-group">
                                <Link to="#" onClick={this.uploadVideoToYoutube.bind(this)}>
                                    <div className="svg-icon svg-baseline">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                        </svg>
                                    </div>
                                    Add video
                                </Link>
                            </div>
                            
                            <div className="form-group text-center">
                                <button className="btn btn-secondary" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewCampaign

NewCampaign.propTypes = {
    history: PropTypes.object.isRequired,
}