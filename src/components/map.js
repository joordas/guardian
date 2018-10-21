import React, { PureComponent } from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from 'react-google-maps';
import f from '../../firebase';
import styled from 'styled-components';

const safeMarker =
  'https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png';

const Map = compose(
  withStateHandlers(
    () => ({
      lat: null,
      lng: null,
      markerLat: null,
      markerLng: null,
      map: null,
      openMarkers: 'self',
      name: '',
      phone: ''
    }),
    {
      onMapRightClick: () => e => ({
        markerLat: e.latLng.lat(),
        markerLng: e.latLng.lng()
      }),
      onMapMounted: () => ref => ({
        map: ref,
        lat: ref.getCenter().lat(),
        lng: ref.getCenter().lng()
      }),
      onDragEnd: ({ map }) => e => ({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
      }),
      handleMarkerClickOpen: ({ openMarkers }) => marker => {
        return { openMarkers: marker };
      },
      handleMarkerClickClose: ({ openMarkers }) => id => {
        return { openMarkers: 'self' };
      },
      handleNameInput: () => e => ({
        name: e.target.value
      }),
      handlePhoneInput: () => e => ({
        phone: e.target.value
      }),
      saveToDatabase: () => (name, phone) => {
        f.database()
          .ref('Map')
          .child('marker')
          .set({
            batata: 'batata'
          });
      }
    }
  ),
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKFw7Jn7M3Lg5bvWQmyrPBdH4wHGAlA-M',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <Wrapper>
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{
        lat: props.lat || -22.978862,
        lng: props.lng || -43.233944
      }}
      ref={props.onMapMounted}
      onRightClick={e => props.onMapRightClick(e)}
      onDragEnd={props.onDragEnd}
    >
      {props.directions && (
        <DirectionsRenderer directions={props.directions} />
      )}

      <Marker
        key={`marker-self`}
        position={{ lat: -22.978862, lng: -43.233944 }}
        onClick={() => props.handleMarkerClickOpen('self')}
      />

      {props.markers.length &&
        props.markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClickOpen(index)}
            defaultIcon={marker.safe ? safeMarker : null}
          />
        ))}
    </GoogleMap>
    <Dashboard>
      {props.openMarkers === 'self' ? (
        <Form onSubmit={e => props.handleFormSubmit(e, { m })}>
          <FormWrapper>
            <label htmlFor="name">Seu Nome</label>
            <Input type="text" name="name" />
            <label html="phone">Seu Telefone</label>
            <Input type="text" name="phone" />
            <Buttons>
              <Button
                red
                type="submit"
                onClick={() =>
                  // TODO: CREATE MARKER
                  props.setDestination(
                    props.markerLat,
                    props.markerLng
                  )
                }
              >
                Estou em Risco
              </Button>
              <Button
                type="submit"
                onClick={() =>
                  // TODO: CREATE MARKER
                  props.setDestination(
                    props.markerLat,
                    props.markerLng
                  )
                }
              >
                Estou Seguro
              </Button>
            </Buttons>
          </FormWrapper>
        </Form>
      ) : (
        <FormWrapper>
          <h1>área segura</h1>
          <Button
            onClick={() =>
              props.setDestination(
                props.openMarkers.lat,
                props.openMarkers.lng
              )
            }
          >
            rota de fuga
          </Button>
        </FormWrapper>
      )}
    </Dashboard>
  </Wrapper>
));

// <input type='text' value={props.name} onChange={props.handleNameInput} />
// <input type='text' value={props.phone} onChange={props.handlePhoneInput} />
// <button
//     onClick={() => props.saveToDatabase({
//         name: props.name,
//         phone: props.phone,
//         lat: -22.978862,
//         lng: -43.233944,
//         safe: false // <<<<<<<<
//     })}

export default class MyMap extends PureComponent {
  state = {
    directions: null
  };

  setDestination = (lat, lng) => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(-22.978862, -43.233944),
        destination: new google.maps.LatLng(lat, lng),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  handleFormSubmit(e) {
    e.preventDefault();
    f.database();
  }

  render() {
    return (
      <Container>
        <Map
          {...this.props}
          directions={this.state.directions}
          setDestination={this.setDestination}
          handleFormSubmit={(e, { lat, lng }) =>
            this.handleFormSubmit(e)
          }
        />
      </Container>
    );
  }
}

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.button`
  background-color: black;
  border: none;
  border: 1px solid ${props => (props.red ? 'red' : '#B2FF59')};
  color: ${props => (props.red ? 'red' : '#B2FF59')};
  margin-top: 12px;
  border-radius: 8px;
  transition-duration: 0.3s;
  padding: 8px;
  &:hover {
    background-color: ${props => (props.red ? 'red' : '#B2FF59')};
    color: black;
  }
`;

const Container = styled.div`
  height: 100%;
  flex: 1;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
`;

const Form = styled.form``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Dashboard = styled.div`
  background-color: black;
  color: white;
  flex: 1;
  height: 100%;
`;

const Input = styled.input`
  border: none;
  border: 1px solid #304ffe;
  background-color: black;
  border-radius: 8px;
  color: white;
`;
