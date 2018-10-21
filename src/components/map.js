import React, { PureComponent } from 'react'
import { compose, withProps, withStateHandlers } from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    DirectionsRenderer
} from "react-google-maps"



const Map = compose(
    withStateHandlers(() => ({
        lat: null,
        lng: null,
        markerLat: null,
        markerLng: null,
        map: null,
        openMarkers: [],
    }),
        {
            // onToggleOpen: ({ isOpen }) => () => ({
            //     isOpen: !isOpen,
            // }),
            onMapRightClick: () => (e) => ({
                markerLat: e.latLng.lat(),
                markerLng: e.latLng.lng(),
            }),
            onMapMounted: () => ref => ({
                map: ref,
                lat: ref.getCenter().lat(),
                lng: ref.getCenter().lng()
            }),
            onDragEnd: ({ map }) => (e) => ({
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            }),
            handleMarkerClickOpen: ({ openMarkers }) => (id) => {
                if (openMarkers.includes(id)) {
                    const filteredMarker = openMarkers.filter(markerId => markerId !== id)
                    return { openMarkers: filteredMarker}
                }
                return { openMarkers: [...openMarkers, id] }
            },
            handleMarkerClickClose: ({ openMarkers }) => (id) => {
                const filteredMarker = openMarkers.filter(markerId => markerId !== id)
                return { openMarkers: filteredMarker}
            }
        }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKFw7Jn7M3Lg5bvWQmyrPBdH4wHGAlA-M",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap)
    (props =>
        <GoogleMap
            defaultZoom={props.zoom}
            defaultCenter={{
                lat: props.lat || -22.978862,
                lng: props.lng || -43.233944,
            }}
            ref={props.onMapMounted}
            onRightClick={(e) => props.onMapRightClick(e)}
            onDragEnd={props.onDragEnd}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}

            <Marker
                key={`marker-self`}
                position={{ lat: -22.978862, lng: -43.233944 }}
                onClick={() => props.handleMarkerClickOpen('self')}
                onClick={() => props.handleMarkerClickOpen('self')}
                >
                {props.openMarkers.includes('self') && <InfoWindow onCloseClick={() => props.handleMarkerClickClose('self')}>
                    <div>
                        <input type='text' />
                        <input type='text' />
                        <button >Salvar localização</button>
                    </div>
                </InfoWindow>}
            </Marker>

            {props.markers.length && props.markers.map((marker, index) => (
                <Marker
                    key={`marker-${index}`}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => props.handleMarkerClickOpen(index)}
                >
                    {props.openMarkers.includes(index) && <InfoWindow onCloseClick={() => props.handleMarkerClickClose(index)}>
                        <div>
                            <input type='text' />
                            <input type='text' />
                            <button onClick={() => props.setDestination(marker.lat, marker.lng)}>Ir até aqui</button>
                        </div>
                    </InfoWindow>}
                </Marker>
            ))}
            {props.markerLat && props.markerLng && <Marker
                position={{ lat: props.markerLat, lng: props.markerLng }}
                onClick={() => props.handleMarkerClickOpen('rightClick')}
            >
                {props.openMarkers.includes('rightClick') && <InfoWindow onCloseClick={() => props.handleMarkerClickClose('rightClick')}>
                    <div>
                        <input type='text' />
                        <input type='text' />
                        <button onClick={() => props.setDestination(props.markerLat, props.markerLng)} >Ir até aqui</button>
                    </div>
                </InfoWindow>}
            </Marker>}
        </GoogleMap>
    );

export default class MyMap extends PureComponent {

    state = {
        directions: null,
    }

    setDestination = (lat, lng) => {
        const DirectionsService = new google.maps.DirectionsService()

        DirectionsService.route({
            origin: new google.maps.LatLng(-22.978862, -43.233944),
            destination: new google.maps.LatLng(lat, lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                })
            } else {
                console.error(`error fetching directions ${result}`);
            }
        })
    }

    render() {
        return <Map {...this.props}
            directions={this.state.directions}
            setDestination={this.setDestination}
        />
    }

}