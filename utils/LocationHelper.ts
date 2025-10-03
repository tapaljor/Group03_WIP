import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
    try {
        const permissionObj = await Location.requestForegroundPermissionsAsync()
        return permissionObj.status === 'granted'
    } catch (error) {
        console.log('Error requesting location permission:', error);
        return false;
    }
}

export async function getCurrentLocation() {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
        throw new Error('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
}

export const subscribeToLocationUpdates = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
        throw new Error('Permission to access location was denied');
    }

    return Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.High,//Location.Accuracy.BestForNavigation, Location.Accuracy.Lowest,
            timeInterval: 10000, // 10 seconds
            distanceInterval: 10, // 10 meters
        },
        (location) => {
            console.log('Location updated:', location);
        }
    );
}

export const performReverseGeocoding = async (latitude: number, longitude: number) => {
    try {
        const result = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log('Reverse geocoding result:', result[0]);
        return result[0]; // Return the first result
    } catch (error) {
        console.log('Error performing reverse geocoding:', error);
        throw error;
    }
}

export const performForwardGeocoding = async (address: string) => {
    try {
        const result = await Location.geocodeAsync(address);
        console.log('Forward geocoding result:', result);
        return result[0]; // Return the first result
    } catch (error) {
        console.log('Error performing geocoding:', error);
        throw error;
    }
}