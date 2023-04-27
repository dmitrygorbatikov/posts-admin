class TokenService {
  getHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
  getToken() {
    return localStorage.getItem("accessToken");
  }

  setToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  }

  removeToken() {
    localStorage.removeItem("accessToken");
  }
}

export default new TokenService();
