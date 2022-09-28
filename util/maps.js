import axios from "axios";

const GOOGLE_APP_KEY = "AIzaSyCLvDjOvXJCiiGmo3hVXtjWhVOhuEWDHDE";

export function createStaticMapURI(lat, lng) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&key=${GOOGLE_APP_KEY}&size=800x450&markers=color:red%7C${lat},${lng}`;
}


export async function getAddresses(lat, lng) {
    const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_APP_KEY}&language=ko`;

    const response = await axios.get(endPoint);
    //    console.log(response.data);

    return response.data.results[0];

}