import React from 'react'
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps"



const Map = compose(
    withStateHandlers(() => ({
        isOpen: false,
      }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
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
            defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
            <Marker
                position={{ lat: props.markerLat, lng: props.markerLng }}
                onClick={props.onToggleOpen}
            >
                {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div>
                        <p>test</p>
                    </div>
                </InfoWindow>}
            </Marker>
        </GoogleMap>
    );

    

export default Map;
