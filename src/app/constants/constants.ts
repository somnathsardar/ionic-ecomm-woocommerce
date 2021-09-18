export const app_constants = {
  sotreUrl: 'https://ecom-multisite.com',
  consumer_key: 'ck_2334331ee0c74301bade90a232b2c7ef3a1c2906',
  consumer_secret: 'cs_312174bad946ccba232ef3a6e08a51583469855e',
  api_version: 'wc/v3'
}

export const getUrl = (type)=>{
  return `${app_constants.sotreUrl}/wp-json/${app_constants.api_version}/${type}`
}

export const getAuthParam = (params = {})=>{
  params['consumer_key'] = app_constants.consumer_key
  params['consumer_secret'] = app_constants.consumer_secret
  return params;
}