export const API_KEY = 'AIzaSyBqfP6OZ0E44Aqr2SlynFXu1_3CklNBjRg'

export const value_converter = (value) => {
    if(value >= 1000000) {
        return Math.floor(value/1000000)+"M"
    }
    else if(value >= 1000) {
        return Math.floor(value/1000)+"K"
    }
    else {
        return value
    }
}