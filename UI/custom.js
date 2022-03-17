
var albumBucketName = "roadway-monitor";
var bucketRegion = "ap-northeast-1";
var IdentityPoolId = "ap-northeast-1:2bf2f7d4-dc61-4722-b04b-53971024aa14";
var prefixPath = "evidence/";
var uploadProcess = null;

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var bucket = new AWS.S3({
    params: {
        Bucket: albumBucketName
    }
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

function uploadUsingSdk(_data) {
    var path = prefixPath + (_data.identity ? _data.identity + "/" : "");
    var objectKey = path + _data.fileName;

    var params = {
        Key: objectKey,
        Body: _data.file
    }

    uploadProcess = bucket.putObject(params, function(err, data) {
        if (err) {
          _data.onUploadError(err);
        } else {
          //   
        }
    }).on('httpUploadProgress', function(progress) { 
    let progressPercentage = Math.round(progress.loaded / progress.total * 100);
    _data.onUploadInProgress(progressPercentage);
    if (progressPercentage == 100) {
        _data.onUploadSuccess();
    }
    })
}

function abortUpload() {
    if (uploadProcess) {
        uploadProcess.abort();
    }
}