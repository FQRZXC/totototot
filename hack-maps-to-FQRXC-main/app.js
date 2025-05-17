import React, { useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
    const [coordinates, setCoordinates] = useState('Не определены');
    const [isTracking, setIsTracking] = useState(false);
    let watchId = null;

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const startTracking = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;

        watchId = Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates(`Широта: ${latitude}, Долгота: ${longitude}`);
            },
            (error) => setCoordinates(`Ошибка: ${error.message}`),
            { enableHighAccuracy: true, distanceFilter: 10 }
        );
        setIsTracking(true);
    };

    const stopTracking = () => {
        if (watchId) Geolocation.clearWatch(watchId);
        setIsTracking(false);
        setCoordinates('Трекинг остановлен');
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18 }}>{coordinates}</Text>
            <Button
                title={isTracking ? "Трекинг активен" : "Начать трекинг"}
                onPress={startTracking}
                disabled={isTracking}
            />
            <Button
                title="Остановить"
                onPress={stopTracking}
                disabled={!isTracking}
            />
        </View>
    );
};

export default App;