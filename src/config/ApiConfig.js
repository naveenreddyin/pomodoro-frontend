// Simple React Native specific changes
var apiBaseUrlString = ''

const path = window.location.origin

var urlFirstPart = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "https://pomodorobackend.herokuapp.com";
var urlSecondPart = "/api/";
apiBaseUrlString = urlFirstPart+urlSecondPart;

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  API_BASE_URL: apiBaseUrlString,
}
