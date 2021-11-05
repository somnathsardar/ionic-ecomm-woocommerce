export const app_constants = {
  sotreUrl: 'YOUR WOOCOMMERCE BACKEND URL',
  consumer_key: 'YOUR CONSUMER KEY',
  consumer_secret: 'YOUR CONSUMER SECRET',
  api_version: 'wc/v3'
}

export const app_settings = {
  cart: {
    addToCartBtnText: "Add to cart",
    onAddingBtnText: 'Adding...',
    addToCartSuccessText: 'Product added successfully',
    addToCartErrorText: 'Something went wrong.'
  },
  shipping: {
    charge: 50.00
  }
}

export const getUrl = (type)=>{
  return `${app_constants.sotreUrl}/wp-json/${app_constants.api_version}/${type}`
}

export const getAuthParam = ()=>{
  let params = {
    'consumer_key' : app_constants.consumer_key,
    'consumer_secret' : app_constants.consumer_secret,
  }
  return params;
}

export const getQueryUrl = (url, query)=>{
  return url+'/'+query
}
