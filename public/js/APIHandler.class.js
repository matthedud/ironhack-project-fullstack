
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

    async sendGame(historic ) {
      try {
        const response = await axios({
          method: "POST",
          url: "/game",
          baseURL: this.BASE_URL,
          data: {historic}
        })
        return response.data
      } catch (err) {console.log({err})}
    }
  }
  