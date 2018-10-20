import React, { Component } from "react";
import Map from '../src/components/map'

class MapPage extends Component {
    render() {
        return (
            <Map
                zoom={12}
                lat={-22.978862}
                lng={-43.233944}
                markerLat={-22.978862}
                markerLng={-43.233944} 
            />
        );
    }
}

export default MapPage;
