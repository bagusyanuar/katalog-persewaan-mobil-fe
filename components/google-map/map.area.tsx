'use client'

import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { MapAreaModel } from '@/model/map.area.model'
import { APIProvider, Map, AdvancedMarker, Pin, Marker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps'
import { DummyMaps } from '@/dummy/data.map'
import { ColorPallete } from '../color'

const Container = styled.div`
    width: 100%;
    height: 500px;
    padding: 0 4rem;
    border-radius: 20px;
    margin-bottom: 1rem;
`

const SectionTitle = styled.p`
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    color: ${ColorPallete.darkTint.tint10};
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const MapArea = () => {

    const data: Array<MapAreaModel> = DummyMaps
    return (
        <Container>
            <SectionTitle>Jangkauan Wilayah</SectionTitle>
            <APIProvider apiKey={`AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k`}>
                <Map
                    mapId={'bf51a910020fa25a'}
                    style={{ borderRadius: '20px', marginBottom: '1rem' }}
                    defaultCenter={{ lat: -7.569181708752813, lng: 110.82957253712782 }}
                    defaultZoom={13}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {
                        data.map((element, key) => {
                            return <MarkerWithInfoWindow
                                key={key}
                                data={element}
                            />
                        })
                    }
                </Map>
            </APIProvider>
        </Container>
    )
}

export default MapArea


interface InfoProps {
    data: MapAreaModel
}
const MarkerWithInfoWindow: React.FC<InfoProps> = ({ data }) => {
    // `markerRef` and `marker` are needed to establish the connection between
    // the marker and infowindow (if you're using the Marker component, you
    // can use the `useMarkerRef` hook instead).
    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    // clicking the marker will toggle the infowindow
    const handleMarkerClick = useCallback(
        () => setInfoWindowShown(isShown => !isShown),
        []
    );

    // if the maps api closes the infowindow, we have to synchronize our state
    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={{ lat: data.Latitude, lng: data.Longitude }}
                onClick={handleMarkerClick}
            />

            {infoWindowShown && (
                <InfoWindow anchor={marker} onClose={handleClose}>
                    <h2>InfoWindow content!</h2>
                    <p>{data.Name}</p>
                </InfoWindow>
            )}
        </>
    );
};
