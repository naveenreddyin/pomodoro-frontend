// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import config from '../config/ApiConfig'


// our "constructor"
const create = (baseURL = config.API_BASE_URL) => {
  // ------
  // STEP 1
  // ------

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Force OpenWeather API Key on all requests
  api.addRequestTransform((request) => {
    // request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
//  if (__DEV__ && console.tron) {
//    api.addMonitor(console.tron.apisauce)
//  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const checkIfEmailExists = (email) => api.get('check_if_username_exists/', {email: email})

  const getOfferImages = (businessId) => api.get(businessId+'/offer-image/', {})


  const locations = () => api.get('locations/')

  const createCustomer = (email, password, name, birthday, mobile, picture) => api.post('customers/',
    {'user':
    {'username': email,
    "email": email,
    "password": password,
    "first_name": name},
    "date_of_birth": birthday,
    "phone_number": mobile,
    "picture": picture
  })
  const loginAndGetToken = (username, password) => api.post('obtain-auth-token/', 
    {'username': username, 'password': password})

  const getCustomerDetails = (email, token) => api.get('customer/'+email+'/', {}, {headers: {'Authorization': 'Token '+token}})

  const getAllSalons = (city, latitude, longitude, token) => api.get('salons/'+latitude+'/'+longitude+'/'+city+'/', {},
    {headers: {'Authorization': 'Token '+token}})
  const getAllRestaurants = (city, latitude, longitude, token) => api.get('businesses/'+latitude+'/'+longitude+'/'+city+'/', {},
    {headers: {'Authorization': 'Token '+token}})

  const testApi = () => api.get('', {})
  const bookAppointmentForDoctor = (doctor_id, customer_name, from_date,
  to_date, hexColor, bookable) => api.post('appointment/'+doctor_id+'/',
  {
    'title': customer_name,
    'start': from_date,
    'end': to_date,
    'bookable': bookable,
    'hexColor': hexColor
  }
  )

  const createPlan = (offer_id, weekday, from_hour, to_hour, price, currency, slot, startDate, stopDate) => api.post(offer_id+'/plans/', {
    'offer': offer_id,
    'to_hour': to_hour,
    'from_hour': from_hour,
    'currency': currency,
    'weekday': weekday,
    'price': price,
    'slots': slot,
    'start_date': startDate,
    'stop_date': stopDate
  })

  const updatePlan = (offer_id, plan_id, weekday, from_hour, to_hour, price, currency, slot, paused, startDate, stopDate) => api.put(offer_id+'/plans/'+plan_id+"/", {
    'offer': offer_id,
    'to_hour': to_hour,
    'from_hour': from_hour,
    'currency': currency,
    'weekday': weekday,
    'price': price,
    'slots': slot,
    'paused': paused,
    'start_date': startDate,
    'stop_date': stopDate
  })

  const getPlans = (offer_id) => api.get(offer_id+"/plans", {})

  const deletePlan = (offer_id, plan_id) => api.delete(offer_id+"/plans/"+plan_id, {})

  const fetchEventsByBusiness = (businessId) => api.get(businessId +'/bookings/', {})

  const checkIfBookingIsPossibleByTime = (date, time) => api.get('book_appointment_for_customer/'+date+" "+time)

  const categories = () => api.get('categories/')

  const getOffers = (city) => api.get('search/'+city)

  const createOffer = (title, subtext, image, businessId) => api.post(businessId+'/offer/', {
    'title': title,
    'subtext': subtext,
    'image': image,
    'business': businessId
  })

  const getOffersByBusinessId = (businessId) => api.get(businessId+'/offer')

  const deleteOfferByBusinessId = (businessId, offerId) => api.delete(businessId+'/offer/'+offerId)

  const updateOfferByBusinessId = (title, subtext, image, businessId, offerId) => api.put(businessId+'/offer/'+offerId, {
    'title': title,
    'subtext': subtext,
    'image': image,
    'business': businessId
  })
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // getCity
    checkIfEmailExists,
    createCustomer,
    loginAndGetToken,
    getCustomerDetails,
    getAllRestaurants,
    testApi,
    bookAppointmentForDoctor,
    fetchEventsByBusiness,
    checkIfBookingIsPossibleByTime,
    locations,
    categories,
    createPlan,
    getPlans,
    deletePlan,
    updatePlan,
    getOffers,
    createOffer,
    getOffersByBusinessId,
    deleteOfferByBusinessId,
    updateOfferByBusinessId,
    getOfferImages
  }
}

// let's return back our create method as the default.
export default {
  create
}
