
class APIHandler {
    constructor(baseUrl) {
      this.BASE_URL = baseUrl
    }
    async getGame() {
      try {
        const response = await axios({
          method: "GET",
          url: "/game",
          baseURL: this.BASE_URL,
        })
        return response.data
      } catch (err) {console.log({err})}
    }

    async sendGame({ historic, ranking } ) {
      try {
        const response = await axios({
          method: "POST",
          url: "/game",
          baseURL: this.BASE_URL,
          data: { historic, ranking }
        })
        return response.data
      } catch (err) {console.log({err})}
    }

    async sendMap({mapToSend}){
      try {
        const response = await axios({
          method: "POST",
          url: "/map",
          baseURL: this.BASE_URL,
          data: { mapToSend }
        })
        window.location.href = '/game'+response.data
      } catch (err) {console.log({err})}     
    }
  }
  