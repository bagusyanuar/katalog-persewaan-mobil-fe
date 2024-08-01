'use client'

import React from 'react'
// import { GoogleMap, LoadScript, Marker, useJsApiLoader, Libraries, } from '@react-google-maps/api';
import { APIProvider, Map, AdvancedMarker, Pin, Marker } from '@vis.gl/react-google-maps'

const containerStyle = {
    width: '100%',
    height: '400px'
};

const centre = {
    lat: 37.437041393899676,
    lng: -4.191635586788259
};

const locations = [
    { lat: 37.437041393899676, lng: -4.191635586788259 },
    { lat: 37.440575591901045, lng: -4.231433159434073 },
    // Add more locations here
];

const ExampleMap = () => {

    // const libraries = ['places', 'drawing', 'geometry'];
    // const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    //     googleMapsApiKey: 'AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k',
    //     libraries: libraries as Libraries,
    // });

    // if (loadError) return <p>Encountered error while loading google maps</p>

    // if (!scriptLoaded) return <p>Map Script is loading ...</p>

    return (
        <APIProvider apiKey={`AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k`}>
            <Map
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <Marker position={{lat: 53.54992, lng: 10.00678}} />
            </Map>
        </APIProvider>
    )
}

export default ExampleMap