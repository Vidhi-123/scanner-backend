function username(){
    let s1=Number(content);
    //console.log("vidhu"+s1);
    if(isNaN(s1))
    {
     document.write("not valid");
    }
   else
   {
     let batch_year=Math.trunc(s1/100000);
     let batch_id=Math.trunc(s1/1000)%100;
     let stu_id=Math.trunc(s1%1000);
     alert(batch_year);
     alert(batch_id);
     alert(stu_id);
    
    var x=Date.now();
    var dat_obj=new Date(x);
    var year=dat_obj.getFullYear();
    alert("final"+year);
   if(batch_id==01)
   {
     if(batch_year<=year && batch_year>=year-4)
     {
      //window.location.href="/lib_tmp/"+content;
     }
     else{
      
        document.getElementById('error-ID').innerHTML="*ID is Invalid";
        document.getElementById('uname').focus();
     }
   }
   else if(batch_id==11 || batch_id==12)
   {
      if(batch_year<=year && batch_year>=year-2)
      {
        //window.location.href="/lib_tmp/"+content;
      }
      else
      {
       
        document.getElementById('error-ID').innerHTML="*ID is Invalid";
        document.getElementById('uname').focus();
      }
   }
   else{
  
    document.getElementById('error-ID').innerHTML="*ID is Invalid";
    document.getElementById('uname').focus();
   } 

   }
}
function ValidateEmail()
{
    var mail = document.getElementById('email').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.value.match(mailformat))
    {
        document.form1.text1.focus();
        return true;
    }
    else
    {
        document.getElementById('error-email').innerHTML="*Email is Invalid";
        document.form1.text1.focus();
        return false;
    }
}