const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");
cloud.init()

var asyncSearchFace = function (url) {
  const IaiClient = tencentcloud.iai.v20180301.Client;
  const models = tencentcloud.iai.v20180301.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("AKIDzqW1Ka9XEk5FD1a9RXUGqETWQ9j8fUed", "4znQ1RiWDi1A95qRxJUWM1OZSHqEQQGc");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile);

  let req = new models.SearchFacesRequest();

  let params = '{"GroupIds":["001"],"Url":"' + url + '","MaxPersonNum":1}'
  req.from_json_string(params);

  return new Promise(function (resolve, reject) {
    client.SearchFaces(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response)
      }
    })
  })
}

exports.main = async (event, context) => {
  const fileList = [event.fileID];
  const result = await cloud.getTempFileURL({
    fileList,
  });
  const url = result.fileList[0].tempFileURL;
  const ret = await asyncSearchFace(url);

  return ret;
}