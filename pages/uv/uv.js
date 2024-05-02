Page({
  data: {
    uvCurrent: {},
    uvHistory: []
  },

  colorByValue: function(value) {
    if (value >= 8) {
      return '#ff4500'; // Red
    } else if (value >= 5) {
      return '#ff8c00'; // Orange
    } else if (value >= 3) {
      return '#ffd700'; // Yellow
    } else {
      return '#9acd32'; // Green
    }
  },
  formatTimestamp: function(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  },
  onLoad: function() {
    this.fetchUVData();
  },

  fetchUVData: function() {
    const that = this;
    wx.request({
      url: 'https://api.data.gov.sg/v1/environment/uv-index',
      success: function(res) {
        if (res.statusCode === 200 && res.data.items.length > 0) {
          let uvData = res.data.items[0].index;
          uvData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          uvData = uvData.map(item => ({
            ...item,
            timestamp: that.formatTimestamp(item.timestamp), // Format timestamp
            color: that.colorByValue(item.value)
          }));
          const currentUV = uvData[0];
          const color = that.colorByValue(currentUV.value);
          that.setData({
            uvCurrent: { ...currentUV, color: color },
            uvHistory: uvData.slice(1)
          });
        } else {
          console.error('Failed to retrieve UV data:', res);
        }
      },
      fail: function(error) {
        console.error('Error fetching UV data:', error);
      }
    });
  }
});
