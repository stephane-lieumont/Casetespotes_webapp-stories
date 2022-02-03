import ApiClass from './api/Api.class'

export const getDataByUrl = () => {
  // URL params
  const url = new URL(window.location.href)
  const params = url.searchParams.get('t')

  // Api request User Profile
  const Api = new ApiClass(require('../data/single.json'))
  return Api.getProfileByToken(params)
}

export const sendDataStory = (data) => {
  const Api = new ApiClass()
  return Api.sendFormStory(data)
}
