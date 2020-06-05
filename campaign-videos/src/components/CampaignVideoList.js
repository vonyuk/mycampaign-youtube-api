import React, { Component } from 'react'
import CampaignVideoCard from './CampaignVideoCard'
import { Link } from 'react-router-dom'

class CampaignVideoList extends Component {
    render() {
        const { campaigns } = this.props

        return (
            <div className="card-columns">
                {
                    campaigns.map(campaign => {
                        const { name, description, _id, videos } = campaign
                        return <CampaignVideoCard key={_id} id={_id} name={name} description={description} videos={videos} style={{margin: '20px'}}/>
                    })
                }
                
                <Link to='/add'>
                    <div className="btn btn-circle center-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="80" viewBox="0 0 24 24" width="80">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                        </svg>
                    </div>
                </Link>
            </div>
        )
    }
}

export default CampaignVideoList