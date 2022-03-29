
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
  }
  