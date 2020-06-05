import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import NewCampaign from './components/NewCampaign'
import CampaignVideoList from './components/CampaignVideoList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { feathersClient } from './feathersClient'
import { CSSTransition } from 'react-transition-group'
// import { Provider } from 'react-redux'

class App extends Component {
    // constructor(...args) {
    //     super(...args);
    //     this.state= { show: false }
    
    //     setInterval(() => {
    //       this.setState({ show: !this.state.show })
    //     }, 5000)
    // }
    constructor(props) {
        super(props)

        this.state = { campaigns: [], show: false }

        // setInterval(() => {
        //     this.setState({ show: !this.state.show })
        // }, 5000)

        const campaigns = feathersClient.service('campaigns')

        campaigns.find().then(response => {
            const campaigns = response.data
            this.setState({ campaigns })
        })
        
        campaigns.on('created', campaign => {
            this.setState((prevState) => {
                let campaigns = prevState.campaigns.slice(0)
                campaigns.push(campaign)
                return { campaigns }
            })
        })

        campaigns.on('updated', campaign => {
            this.setState((prevState) => {
                const campaigns = prevState.campaigns.slice(0)
                let index = campaigns.findIndex((_campaign) => _campaign._id === campaign._id)
                campaigns.splice(index, 1, campaign)
                return { campaigns }
            })
        })
    }

    render() {
        const { campaigns } = this.state
        return (
            // <Provider>
            <Router>
                {/* <CSSTransition
                in={this.state.show}
                classNames="fade"
                timeout={5000}
                > */}
                    {/* <CampaignVideoList campaigns={campaigns} /> */}
                    <Switch>
                        <Route exact path="/" render={() => <CampaignVideoList campaigns={campaigns} />} />
                        <Route exact path="/add" component={NewCampaign} />
                    </Switch>
                {/* </CSSTransition> */}
            </Router>
            // </Provider>
        )
    }
}

export default App