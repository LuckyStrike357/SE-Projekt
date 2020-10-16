var Deploy = require('ftp-deploy');
var ftpDeploy = new Deploy();
 
var config = {
    host : "ec2-54-93-73-128.eu-central-1.compute.amazonaws.com",
    user : "ftpuser",
    password : "ftp123",
    port: 21,
    localRoot: __dirname + '/build',
    remoteRoot: '/files',
    include: ['*'],
    deleteRemote: true 
}
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err)
    else console.log('finished:', res);
});
ftpDeploy.on("uploading", function(data) {
    data.totalFilesCount; 
    data.transferredFileCount;
    data.filename; 
});
ftpDeploy.on("uploaded", function(data) {
    console.log(data); 
});
ftpDeploy.on("log", function(data) {
    console.log(data);
});
ftpDeploy.on("upload-error", function(data) {
    console.log(data.err);
});
