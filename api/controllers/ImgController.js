/**
 * ImgController
 *
 * @description :: Server-side logic for managing imgs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var fs = require('fs');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {

	search: function(req, res){
    var modelSearchall= actionUtil.parseModel(req);
    var valueSearchall = actionUtil.parseValues(req);
    console.log(valueSearchall);
    modelSearchall.find().where({title:valueSearchall}).exec(function(err, result){
      if(err) return console.log(err);
      console.log(result);
      return res.view('images',{
        result:result
      });
    });
  },
  search2: function(req, res){
    Img.find().exec(function(err, result){
      if(err) return console.log(err);
      return res.json(200,{result:result});

    });
  },
  searchID: function(req, res){
    var ident = req.params.id;
    Img.findById(ident).exec(function(err, result){
      if(err){
        return console.log(err);
      } else{
        return res.view('updateid',{result:result});
      }
      
    });
  },

  update: function(req, res){
    var modelUpdate = actionUtil.parseModel(req);
    var valueUpdate = actionUtil.parseValues(req);
    modelUpdate.update({id: valueUpdate.id}, valueUpdate).exec(function(err, result) {
      if(err) return res.send('exist');
      return res.redirect('images');
    });

  },
  delete: function(req, res){
    var modelUpdate = actionUtil.parseModel(req);
    var valueUpdate = actionUtil.parseValues(req);

    fs.unlink('/var/www/assets/fotos/'+valueUpdate.uri);
    modelUpdate.destroy({id:valueUpdate.id}).exec(function(err){
      if(err) return console.log("error al borrar");
       return res.send("success");
    });
    
    
  }
 
};

