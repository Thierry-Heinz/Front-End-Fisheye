export default class SorterApi {
  async sorter(data, value) {
    if (value === "likes") {
      var sortedData = Array.from(data).sort((a, b) => b.likes - a.likes);
    } else if (value === "title") {
      var sortedData = Array.from(data).sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
    } else if (value === "date") {
      var sortedData = Array.from(data).sort(function (a, b) {
        if (new Date(a.date) < new Date(b.date)) return 1;
        if (new Date(a.date) > new Date(b.date)) return -1;
        return 0;
      });
    }
    return sortedData;
  }
}
