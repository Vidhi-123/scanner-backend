var express=require('express');
var router=express.Router();
var tmp_lib=require('../models/lib_tmp');
var lib=require('../models/library');
const date = require('date-and-time');
router.get('/',function(req,res,next){
    
   
    tmp_lib.find(function(err,docs){
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            console.log(docs.length);
            //res.json(docs);
            
        
                var i;
                var id1;
                for(i=0;i<docs.length;i++)
                {
                    id1=docs[i].user_id;
                tmp_lib.find({user_id:id1},function(err,docs1){
                    console.log(docs);
                    if(err)
                    {
                        res.json(err);
                    }// wait ek min
                    else
                    {
                        //res.json(docs);
                        console.log(docs1[0]);
            
                        const now = new Date();
                        let curtime=date.format(now,'HH:mm:ss')
                        docs1[0].out_time=curtime;
                        //date:new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()+1)
                        
                        docs1[0].save(function(err1,res1){
                            if(err1)
                            {
                                res.json(err1);
                            }
                            else
                            {
                                //res.json(res1);
                                    const lib1=new lib({
                                    user_id : docs1[0].user_id,
                                    in_time :docs1[0].in_time,
                                    out_time:docs1[0].out_time,
                                    date:docs1[0].date
                                    
                                   
                                });
                                console.log(lib1);
                                lib1.save(function(err,result){
                                    if(err)
                                    {
                                        res.json(err);
                                    }
                                    else{
                                        //res.json(result);


                                        console.log(lib1.user_id);
                                        tmp_lib.deleteOne({user_id:lib1.user_id},function(err,result){
                                            if(err)
                                            {
                                                res.json(err);
                                            }
                                            else
                                            {
                                                //res.json(result);
                                                console.log(result);
                                                //res.redirect('/lib_tmp');
                                            }
                                        })
                                    







                                    }
                                });
                                



                            }
                        });
            
                    }
                });



            }
            
        }
       
        //console.log("done lib");//su kravu lakh tu
        setTimeout(()=>{res.redirect('/lib_tmp')}, 1000); 
    });

   
});
module.exports =router;