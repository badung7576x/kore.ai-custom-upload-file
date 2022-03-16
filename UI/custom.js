
var albumBucketName = "roadway-monitor";
var bucketRegion = "ap-northeast-1";
var IdentityPoolId = "ap-northeast-1:2bf2f7d4-dc61-4722-b04b-53971024aa14";

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

function uuidv4() {
  var kore_uuid = localStorage.getItem('kore_uuid');
  if (kore_uuid) {
      return kore_uuid;
  } else {
      kore_uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
      localStorage.setItem('kore_uuid', kore_uuid);
      return kore_uuid;
  }
}

function uploadUsingSdk(files, identity=null) {
  if (!files.length) {
      return;
  }
  var file = files[0];
  var fileName = file.name;
  var path = "evidence/" + (identity ? identity + "/" : "");
  var objecKey = path + fileName;

  var upload = new AWS.S3.ManagedUpload({
      params: {
          Bucket: albumBucketName,
          Key: objecKey,
          Body: file
      }
  });

  var promise = upload.promise();
  promise.then(
      function (data) {
          console.log("Successfully uploaded photo to aws.");
      },
      function (err) {
          console.error("There was an error uploading your photo: ", err.message);
      }
  );
}

// async function uploadUsingPresignUrl() {
//   var user_id = document.getElementById("user_id").value;
//   var files = document.getElementById("photoupload").files;
//   var fileData = files[0];
//   var fileName = fileData.name;
//   var contentType = fileData.type
//   const response = await axios.get('https://plz748xtn3.execute-api.ap-northeast-1.amazonaws.com/staging/get_upload_presign_url?user_id=' + user_id + '&file_name=' + fileName + '&content_type=' + contentType)

//   const preSigned = response.data.data.presign_url
//   console.log(preSigned);

//   await axios.put(preSigned, fileData, {
//       headers: {
//           "Content-Type": fileData.type
//       },
//       onUploadProgress: (e) => {
//           //  Show progress
//           var percentCompleted = Math.round((e.loaded * 100) / e.total);
//           document.getElementById("uploadProgress").innerHTML = percentCompleted;
//         },
//   })
//   alert("Upload completed");
// }
