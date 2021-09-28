export const app_constants = {
  sotreUrl: 'https://ecom-multisite.com',
  consumer_key: 'ck_2334331ee0c74301bade90a232b2c7ef3a1c2906',
  consumer_secret: 'cs_312174bad946ccba232ef3a6e08a51583469855e',
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