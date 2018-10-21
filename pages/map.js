import React, { Component } from "react";
import f from '../firebase'
import Map from '../src/components/map'

class MapPage extends Component {

    state = {
        markers: [],
    }

    componentDidMount() {
        f.database().ref('Map').child('marker').once('value').then(a => {
            const markers = Object.values(a.val())
            console.log(markers)
            this.setState({ markers })
        })
    }

    render() {
        return (
            <Map
                zoom={14}
                markers={this.state.markers}
            />
        );
    }
}

export default MapPage;
