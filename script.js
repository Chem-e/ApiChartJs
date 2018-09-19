var app = new Vue({
  el: "#app",
  data: {
    chart: null,
    city: "",
    dates: [],
    humidity: [],
    loading: false,
    errored: false
  },
  methods: {
    getData: function() {
      this.loading = true;

      if (this.chart != null) {
        this.chart.destroy();
      }

       axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: this.city,
          units: "imperial",
          appid: "fd3150a661c1ddc90d3aefdec0400de4"
        }
      })
      .then(response => {
        this.dates = response.data.list.map(list => {
          return list.dt_txt;
        });

        this. humidity= response.data.list.map(list => {
          return list.main.humidity;
        });

        var ctx = document.getElementById("myChart");
        this.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.dates,
            datasets: [
            {
              label: "Avg. Humidity",
              backgroundColor: " (232, 236, 241, 1)",
              borderColor: "rgb(54, 162, 235)",
              fill: false,
              data: this.humidity
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: "Humidity with Chart.js"
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var label =
                  data.datasets[tooltipItem.datasetIndex].label || "";

                  if (label) {
                    label += ": ";
                  }

                  label += Math.floor(tooltipItem.yLabel);
                  return label ;
                }
              }
            },
            scales: {
              xAxes: [
              {
                type: "time",
                time: {
                  unit: "hour",
                  displayFormats: {
                    hour: "M/DD @ hA"
                  },
                  tooltipFormat: "MMM. DD @ hA"
                },
                scaleLabel: {
                  display: true,
                  labelString: "Date/Time"
                }
              }
              ],
              yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Humidity"
                },
                ticks: {
                  callback: function(value, index, values) {
                    return value ;
                  }
                }
              }
              ]
            }
          }
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    }
  }
});