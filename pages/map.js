import React, { Component } from "react";
import f from '../firebase'
import Map from '../src/components/map'

class MapPage extends Component {

    state = {
        markers: [],
    }

    componentDidMount() {
        //     f.database()
        //   .ref('Map').child('marker')
        //   .push({
        //     lat: -22.9739675,
        //     lng: -43.2258994
        // });
        f.database().ref('Map').child('marker').once('value').then(a => {
            const markers = Object.values(a.val())
            console.log(markers)
            this.setState({ markers })
        })
    }

    render() {
        return (
            <Map
                zoom={12}
                // lat={-22.978862}
                // lng={-43.233944}
                markers={this.state.markers}
            />
        );
    }
}

export default MapPage;
