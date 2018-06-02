import helpers from "./helpers";

const CLIENT_ID = "a47a5fb4cf5e039";
const options = {
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`
  }
};

const getImage = function(query) {
  const url = `https://api.imgur.com/3/gallery/search/?q=${query}`;

  function parseResp(res) {
    const { data } = res;
    console.log(data);
    if (data.length === 0) {
      return { error: true, message: "No image results found." };
    }
    return data[0].images[0].id;
  }

  function getImgByID(res) {
    if (res.error) {
      return res;
    }
    const endpoint = `https://api.imgur.com/3/image/${res}`;
    return helpers.getJSON(endpoint, options);
  }

  function parseResult(result) {
    if (result.error) {
      return result;
    }
    return result.data.link;
  }

  return helpers
    .getJSON(url, options)
    .then(res => parseResp(res))
    .then(resp => getImgByID(resp))
    .then(result => parseResult(result));
};

export default { getImage };
