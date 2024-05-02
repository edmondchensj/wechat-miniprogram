Page({
  data: {
    taxis: []
  },

  onLoad: function() {
    this.fetchTaxiLocations();
  },

  fetchTaxiLocations: function() {
    wx.request({
      url: 'https://api.data.gov.sg/v1/transport/taxi-availability',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            taxis: res.data.features[0].geometry.coordinates
          });
          console.log('taxi data: ', res.data.features[0])
        } else {
          console.error('Failed to retrieve taxi data:', res);
        }
      },
      fail: (error) => {
        console.error('Error fetching taxi data:', error);
        wx.showToast({
          title: 'Failed to load data',
          icon: 'none'
        });
      }
    });
  }
});
