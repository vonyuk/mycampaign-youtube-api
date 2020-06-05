import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { Link } from 'react-router-dom'
import { feathersClient } from '../feathersClient'

class CampaignVideoCard extends Component {

    addVideoToCampaign(e){
        e.preventDefault()
        
        const { name, description, videos, id } = this.props

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
                videos.push(video.id)
                feathersClient.service('campaigns').update(id, {name, description, videos})
            },
            onErrorOccurred: function(err) {
                console.log(err)
            }
        }).open()
    }

    render() {
        const opts = {
            width:'100%',
            playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                playsinline: 0,
            }
        }
        const { name, description, videos, style } = this.props

        return (
            <div className="card" style={style}>
                <YouTube
                    className='card-img-top'
                    videoId={!!videos ? videos[0] : null}
                    opts={opts}
                />

                <div className="card-body">
                    <h4 className="card-title">{ name }</h4>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: description }}></p>
                    <div className="form-group">
                        <Link to="#" onClick={this.addVideoToCampaign.bind(this)}>
                            <div className="svg-icon svg-baseline">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                </svg>
                            </div>
                            Add video
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CampaignVideoCard