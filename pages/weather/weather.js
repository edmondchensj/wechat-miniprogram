// weather.js
Page({
  data: {
    areas: []
  },

  onLoad() {
    this.fetchWeatherData();
  },

  fetchWeatherData() {
    console.log('fetching weather data')
    wx.request({
      url: 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            areas: res.data.area_metadata
          });
        } else {
          console.error('Failed to retrieve data:', res);
        }
      },
      fail: (error) => {
        console.error('Error fetching weather data:', error);
      }
    });
  }
});
