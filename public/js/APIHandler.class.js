
class APIHandler {

    async getGame() {
      try {
        const response = await axios({
          method: "GET",
          url: "/game",
          baseURL: window.location.origin+'/API',
        })
        return response.data
      } catch (err) {console.log({err})}
    }

    async sendGame({ historic, ranking, historicBullets } ) {
      console.log('URL:' , window.location.origin+'/API');
      console.log('WINDOW:' , window.location.origin+'/API');
      try {
        const response = await axios({
          method: "POST",
          url: "/game",
          baseURL: window.location.origin+'/API',
          data: { historic, ranking, historicBullets }
        })
        openModal(response.data)
      } catch (err) {console.log({err})}
    }

    async sendMap({mapToSend}){
      try {
        const response = await axios({
          method: "POST",
          url: "/map",
          baseURL: window.location.origin+'/API',
          data: { mapToSend }
        })
        window.location.href = '/game'+response.data
      } catch (err) {console.log({err})}     
    }
  }

  