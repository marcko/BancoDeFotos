/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');

module.exports = {
	upload: function (req, res) {

	 res.setTimeout(0);

    req.file('avatar')
    .upload({

      // You can apply a file upload limit (in bytes)
      dirname:'/var/www/assets/fotos',
      maxBytes: 1000000,
      
    },function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      var str = uploadedFiles[0].fd;
      var uri = str.replace('/var/www/assets/fotos/','');
      var data = {
      		title:req.body.title,
      		author:req.body.author,
      		price:req.body.price,
      		description:req.body.description,
      		uri:uri,
      		category:req.body.category
      }
      Img.create(data).exec(function(err, result){
        if(err){
          fs.unlink(uploadedFiles[0].fd,function(err){
            if(err) return console.log(err)
            console.log(uploadedFiles[0].fd+" is deleted");
            return res.send("ya existe este nombre");
          });
       }else{

            return res.redirect('/');
       }
      });

    });
  },
  s3upload: function (req, res) {

    // e.g.
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // etc.
    //
    // Node defaults to 2 minutes.

    req.file('avatar').upload({
      adapter: require('skipper-s3'),
      bucket: "marckoimages",
      key: "AKIAIKK324IOEPQZXP3A",
      secret: "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"
    }, function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      console.log(uploadedFiles[0].extra.Location);
     var data = {
          title:req.body.title,
          author:req.body.author,
          price:req.body.price,
          description:req.body.description,
          uri:uploadedFiles[0].extra.Location,
          category:req.body.category
      }
       Img.create(data).exec(function(err, result){
        if(err){
            return console.log(err);

       }else{

            return res.redirect('/images');
       }
      });
    });
  },


  /**
   * FileController.download()
   *
   * Download a file from the server's disk.
   */
  download: function (req, res) {
    require('fs').createReadStream(req.param('path'))
    .on('error', function (err) {
      return res.serverError(err);
    })
    .pipe(res);
  }
  
};

