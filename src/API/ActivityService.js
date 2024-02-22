export default class ActivityService {
  static APILink = "https://www.boredapi.com/api/activity";

  static async get() {
    try {
      const response = await fetch(this.APILink);
      const data = await response.json();
      return data;
    }
    catch (err) {
      console.log(err);
    }
  };
};
