var express=require('express');
var router=express.Router();
var equipment=require('../models/equipment');
var sac=require('../models/sac_records');
var mail_equ=require('../models/mail_equipment');

router.get('/delete/:id',function(req,res,next){
    equipment.findByIdAndDelete(req.params.id,function(err,docs){
        if(err){
            res.json(err);
        }
        else{
            res.redirect('/equipment/');
        }
    })
})
router.get('/',function(req,res,next){
    equipment.find(function(err,docs){
                if(err)
                {
                    console.log(err);
                    res.json(err);
                }
                else
                {
                    console.log(docs);
                    //res.json(docs);
                    res.render('display_equipment',{
                        title:'display',
                        equipments:docs,
                        errors:null
                    })
                }
            
            });    

})



router.get('/:stu_id/:equ_id',function(req,res,next){
    console.log(req.params.stu_id);
    console.log(req.params.equ_id);
    equipment.find({student_id:req.params.stu_id,equipment_id:req.params.equ_id},function(err,rows){
        console.log(rows);
        if(err)
        {
            res.json(err);
        }
        else{
            if(rows.length==0)
            {
                var x=Date.now();
               var dat_obj=new Date(x);
                const equi=new equipment({
                            equipment_id : req.params.equ_id,
                            student_id : req.params.stu_id,
                            issue_date : new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()),
                           
                            
                        });
                        console.log(equi);
                        equi.save(function(err,result){
                            if(err)
                            {
                                res.json(err);
                            }
                            else{
                                //res.json(result);
                                var data={
                                    "id":req.params.stu_id,
                                    "equipment":req.params.equ_id,
                                    "return_date":new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()+7)
                                };
                               mail_equ.sendMail(data);
                               res.redirect('/equipment');
                                }
                        });
            }
            else{
                var x=Date.now();
               var dat_obj=new Date(x);


                //console.log(dat_obj-rows[0].issue_date);
                
                var dat_obj1=new Date(rows[0].issue_date);
                const diffTime = Math.abs(dat_obj - dat_obj1);
                var loan1=0;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if(diffDays>7)
                {
                    loan1=(diffDays-7)*5
                }
                const sac1=new sac({
                            equipment_id : rows[0].equipment_id,
                            student_id : rows[0].student_id,
                            issue_date : rows[0].issue_date,
                            return_date:new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()),
                            loan:loan1

                           
                            
                        });
                        console.log(sac1);
                        sac1.save(function(err,result){
                            if(err)
                            {
                                res.json(err);
                            }
                            else{
                                //res.json(result);
                                equipment.deleteOne({student_id:req.params.stu_id,equipment_id:req.params.equ_id},function(err,result){
                                            if(err)
                                            {
                                                res.json(err);
                                            }
                                            else{
                                                //res.json(result);
                                                res.redirect('/equipment');
                                            }
                                        })
                            }
                        });
            }
        }
    })
})

















module.exports=router;
