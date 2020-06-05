// import * as types from '../actions/actionTypes'

// const initialState = {
//     campaigns: []
// }

// function campaigns(state = initialState, action = {}) {
//     switch (action.type) {
//         case types.APP_INIT:
//             const campaigns = feathersClient.service('campaigns')
        
//             campaigns.find().then(response => {
//                 const campaigns = response.data
//                 this.setState({ campaigns })
//             })
            
//             campaigns.on('created', campaign => {
//                 this.setState((prevState) => {
//                     let campaigns = prevState.campaigns.slice(0)
//                     campaigns.push(campaign)
//                     return { campaigns }
//                 })
//             })
//             return state

//         case types.CAMPAIGN_ADD:
            
//             break

//         case types.CAMPAIGN_ADD:
//             break

//         default:
//             return state
//     }
// }

// export default campaigns