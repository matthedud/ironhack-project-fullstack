
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
        await axios({
          method: "POST",
          url: "/game",
          baseURL: this.BASE_URL,
          data: { historic, ranking }
        })
        console.log('here');
        window.location.href = "/"
      } catch (err) {console.log({err})}
    }
  }
  