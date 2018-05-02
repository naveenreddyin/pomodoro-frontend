// Simple React Native specific changes
var apiBaseUrlString = ''

const path = window.location.origin
console.log(window.location)

var urlFirstPart = path;
var urlSecondPart = "/api/";
apiBaseUrlString = urlFirstPart+urlSecondPart;

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  API_BASE_URL: apiBaseUrlString,
}
