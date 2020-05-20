
const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
var event = require('events');
var cors = require('cors');
const bodyParser = require('body-parser')
var request_data;
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/posts', posts);




var corsOptions = {
    origin: ['http://51.105.27.186:4200', 'http://localhost:4200'],
    optionsSuccessStatus: 200 // 
  }
app.use(cors(corsOptions))

//database configuration
const connection = mysql.createConnection({
    host     : '51.105.27.186',
    port     :   3306,
    user     : 'user',
    password : '123',
    database : 'IBMProject'
  });
  
  connection.connect();




  
// app.get('/', (req, res)=>{
//     res.sendFile(path.join('/Users/zhangyanke/Downloads/architectui-angular-pro-theme-package 2/architectui-angular-pro-theme/dist/architectui-angular-pro/index.html'))
// })

Key = "secretKey"
//login
app.post('/login', (req, res)=>{
    var data = req.body;
    //check username in university_staff
    connection.query("Select email, password, first_name, family_name, university, job_title, department from university_staff where "+"\'"+data.email+"\'"+"=email", function(error, results, fields){
        //if null, check username in IBM_staff
        if(results[0]==undefined){
            connection.query("Select email, password, first_name, family_name, job_title, department from IBM_staff where "+"\'"+data.email+"\'"+"=email", function(error, results, fields){
                if(error){
                    res.status(401).send("server error")
                } else {
                    
                    var string=JSON.stringify(results);
                    var json =  JSON.parse(string);
                    //if still didn't find, then the email is not registered
                    if(json[0]==undefined){
                        res.status(401).send("Invalid email!")
                    } else {
                        //IBM user
                        email = json[0].email
                        password = json[0].password
                        //if the email does not match password, send error message
                        if(data.password != password){
                            res.status(401).send("Invalid password!");
                        } else {
                            //create session token with 30 min
                            let payload = { exp: Math.floor(Date.now()/1000+60*60),data:data.user_name }
                            let token = jwt.sign(payload, Key);
                            //tell client this is an ibm user, send the token
                            res.status(200).send({token,type:'IBM'});
                        }
                    }  
                }
            })
        }
        else if(error){
          res.status(401).send("server error")
        } else {
            var string=JSON.stringify(results);
            var json =  JSON.parse(string);
            if(json[0]==undefined){
                //if still didn't find, then the email is not registered
                res.status(401).send("Invalid email!")
            } else {
                //University user
                email = json[0].email
                password = json[0].password
                //if the email does not match password, send error message
                if(data.password != password){
                    res.status(401).send("Invalid password!");
                } else {
                    //create session token with 30 min
                    let payload = { exp: Math.floor(Date.now()/1000+60*60),data:data.user_name }
                    let token = jwt.sign(payload, Key);
                    //tell client this is an ibm user, send the token
                    res.status(200).send({token,type:'university'});
                }
            } 
        }
    })
})

app.route('/token/:token').get((req,res)=>{
    //get token
    token = req.params.token
    try{
        jwt.verify(token, Key);              //verity the token with corresponding key
        result = true                        //if there is no error, set return value  to true
    }catch(error){                           //if token not valid
        result = false;                      //set return value to false
    }
    res.send(result)
})

//register

app.post('/register', (req, res)=>{
    var data = req.body;
    console.log(data);
    var username = data.email;
    connection.query('SELECT email from university_staff where email=\''+username+'\'', function (error, results, fields) {
        if (error) throw error;
        if(results[0]!=undefined){
            res.status(401).send('Account already exist!')
            return
        }else{
            connection.query('SELECT email from IBM_staff where email=\''+username+'\'', function (error, results, fields) {
                if (error) throw error;
                if(results[0]!=undefined){
                    res.status(401).send('Account already exist!')
                    return
                }else{
                    
                    var sql = "INSERT INTO university_staff (first_name,family_name, job_title,university,email, phone, user_name, password, department) VALUES (\'"+data.first_name+"','"+data.family_name+"','"+data.job_title+"','"+ data.university+"','"+  data.email+"','"+ data.phone+"','"+ data.email+"','"+data.password+"','"+data.department+"')"
                    connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("added");
                    res.status(200).send({res:'hi'});
                    });
                }
            });
        }
    });
})
  


//load university staff info
app.post('/user',(req, res)=>{
    var uname = req.body.user;
    //console.log(uname);
    connection.query('SELECT id,first_name,family_name,department,job_title,email,user_name FROM university_staff where user_name='+'\''+uname+'\''+';', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        ////console.log(uname);
    });
})

//main dashboard data
app.route('/dashboard/analytics/:id').get((req, res)=>{
    username = req.params.id;
    result = []
    thisWeek = []
    thisMonth = []
    //get list of date and number of events in that date
    connection.query('SELECT date, count(req_id) as req_num, count(distinct username) as user_num, count(distinct university) as uni_num FROM request GROUP BY date', function (error, results, fields) {
        if (error) throw error;
        result = results
    });
     //get requests number in a week
    var date = dateChange(7)
    connection.query('SELECT count(req_id) as req_num FROM request where date>\''+date+'\'', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        //console.log(results);
        thisWeek = results
    });
     //get requests number in a month
    date = dateChange(30)
    connection.query('SELECT count(req_id) as req_num FROM request where date>\''+date+'\'', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        //console.log(results);
        thisMonth = results
    });
    //get number of requests group by type
    connection.query('SELECT type, count(type) as number from request GROUP BY type', function (error, results, fields) {
        if (error) throw error;
        //merge 4 groups of data in one object, send it back to dashboard
        res.send({
            request:result,
            type:results,
            thisWeek:thisWeek,
            thisMonth:thisMonth
        })
    });

})


//request
app.route('/dashboard/requests/:username').get((req, res)=>{
    username = req.params.username
    console.log(username)
    connection.query('SELECT req_id, first_name, family_name, date,university,type ,topic,state FROM request where username=\''+username+'\'', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
    });
})

//request detail
app.route('/dashboard/request-detail/:id/:username').get((req, res)=>{
    id = req.params.id;
    username = req.params.username
    connection.query('SELECT * FROM request where username=\''+username+'\';', function (error, results, fields) {
        if (error) throw error;
       // //console.log(results[id-1]);
        res.send(results[id-1]);
        
    });
})

//new request
app.post('/forms/stickyheader',(req, res)=>{
    //console.log(req.body);
    read_request_new_request(req.body);
})



//calendar
app.route('/components/calendar').get((req, res)=>{
    connection.query('SELECT first_name, university, date,start,end,  type ,topic,postcode FROM request', function (error, results, fields) {
        if (error) throw error;
        //console.log(results)
        res.send(results);
    });
})
//map
app.route('/components/map').get((req, res)=>{
    connection.query('SELECT * FROM university', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        //console.log(results);
    });
})

//load IBM staff info
app.post('/ibm/user',(req, res)=>{
    var uname = req.body.user;
    //console.log('uname');
    
    connection.query('SELECT id,first_name,family_name,department,job_title,email,username FROM IBM_staff where username='+'\''+uname+'\''+';', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        ////console.log(uname);
    });
})



//IBM main page
app.route('/ibm/analytics/:id').get((req, res)=>{
    username = req.params.id;
    result = []
    type = []
    connection.query('SELECT date, count(req_id) as req_num, count(distinct username) as user_num, count(distinct university) as uni_num FROM request GROUP BY date', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        result = results
    });

    connection.query('SELECT type, count(type) as number from request GROUP BY type', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        type = results
    });
    connection.query('SELECT university, count(distinct username) as user_number, count(req_id) as req_number from request GROUP BY university ORDER BY count(req_id) desc', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        res.send({
            request:result,
            type:type,
            university:results
        })
    });

})



//ibm university page
app.route('/ibm/university').get((req,res)=>{
    date=[]
    connection.query('SELECT date, count(req_id) as req_num FROM request GROUP BY date', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        date = results
    });
    connection.query('SELECT university, count(req_id) as req_num FROM request GROUP BY university ORDER BY count(req_id) desc', function (error, results, fields) {
        if (error) throw error;
        res.send({
            date:date,
            university:results
        });
    });
})

//table for university page

app.route('/ibm/table/university').get((req,res)=>{
    connection.query('select university,count(req_id) as request, count(distinct username) as users from request group by university', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
    });
})

//staff table 

app.route('/ibm/table/staff').get((req,res)=>{
    connection.query('select b.id, b.first_name, b.family_name, b.university, b.job_title, b.email,b.phone,count(a.req_id) as request from request a, university_staff b where a.username = b.user_name group by username', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
    });
})

//university detail 
app.route('/ibm/university-detail/:university').get((req, res)=>{
    university = req.params.university;
    type=[]
    connection.query('SELECT type, count(type) as number  from request where university=\''+university+'\' group by type', function (error, results, fields) {
        if (error) throw error;
       // //console.log(results[id-1]);
        type = results
    });

    connection.query('SELECT date, count(req_id) as request,count(distinct username) as users  from request where university=\''+university+'\' group by date', function (error, results, fields) {
        if (error) throw error;
       // //console.log(results[id-1]);
        res.send({
            type:type,
            result:results
        })
    });
})

//Requests in university detail page
app.route('/ibm/university/requests/:university').get((req, res)=>{
    
    university = req.params.university
    connection.query('SELECT req_id, first_name, family_name, date,university,type ,topic,state FROM request where university=\''+university+'\'', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
    });
})



//IBM request page
app.route('/ibm/requests').get((req, res)=>{
    
    
    connection.query('SELECT req_id, first_name, family_name, date,university,type ,topic,state FROM request', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
    });
})



//update states
app.post('/forms/request',(req, res)=>{
    //console.log(req.body);
    name=''
    if(req.body.type=='deny'){
        var string = '\''+'denied'+'\''
        
        var sql = 'UPDATE request SET state='+ string +' WHERE req_id = '+req.body.id
        
        
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            
            //console.log(results);
        });
        user=req.body.user
        
        sql="select first_name, family_name from IBM_staff where username = '"+user+"';"
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            
            name = results[0].first_name+' '+results[0].family_name
            name=JSON.stringify(name)
            sql = 'UPDATE request SET ibm_staff='+ name +' WHERE req_id = '+req.body.id+";"
            //console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                
                //console.log('success')
            });
        });
        
        
        
    }else if(req.body.type=='confirm'){
        var string = '\''+'confirmed'+'\''
        
        var sql = 'UPDATE request SET state='+ string +' WHERE req_id = '+req.body.id
        //console.log(sql)
        
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            
            //console.log(results);
        });
        user=req.body.user
        
        sql="select first_name, family_name from IBM_staff where username = '"+user+"';"
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            
            name = results[0].first_name+' '+results[0].family_name
            name=JSON.stringify(name)
            sql = 'UPDATE request SET ibm_staff='+ name +' WHERE req_id = '+req.body.id+";"
            //console.log(sql)
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                
                //console.log('success')
            });
        });
        
    }
})

 


//get pdf selector options
app.route('/dashboard/pdf/:id').get((req, res)=>{
    //username = req.params.id;
    result = []
    type = []
    university = []
    university_staff = []
    connection.query('SELECT date, count(req_id) as req_num, count(distinct username) as user_num, count(distinct university) as uni_num FROM request GROUP BY date', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        //console.log(results);
        result = results
    });

    connection.query('SELECT type, count(type) as number from request GROUP BY type', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        type = results;
    });

    connection.query('SELECT university from request GROUP BY university', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        university = results
    });

    connection.query('select a.first_name,  a.family_name from (SELECT a.username from request as a, university_staff as b where a.username = b.email GROUP BY a.username) as b, university_staff as a where a.user_name=b.username;', function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        university_staff = results
    });

    connection.query("select distinct ibm_staff from request where ibm_staff!='Not handled' group by ibm_staff", function (error, results, fields) {
        if (error) throw error;
        //res.send(results);
        ////console.log(results);
        res.send({
            request:result,
            type:type,
            university:university,
            university_staff:university_staff,
            ibm_staff:results
        })
    });
    
})

//select pdf data
app.post('/dashboard/pdfdata',(req, res)=>{
    result = []
    type = []
    university = []
    university_staff = []
    //username = req.params.id;
    data = req.body
    condition_sql = construct_condtion(data)
    //console.log(condition_sql)
    
 
        connection.query('SELECT date, count(req_id) as req_num, count(distinct username) as user_num, count(distinct university) as uni_num FROM request where '+condition_sql+' GROUP BY date', function (error, results, fields) {
            if (error) throw error;
            //res.send(results);
            ////console.log(results);
            result = results
        });
    
        connection.query('SELECT type, count(type) as number from request where '+condition_sql+' GROUP BY type', function (error, results, fields) {
            if (error) throw error;
            //res.send(results);
            ////console.log(results);
            type = results;
        });
    
        connection.query('SELECT university from request where '+condition_sql+' GROUP BY university', function (error, results, fields) {
            if (error) throw error;
            //res.send(results);
            ////console.log(results);
            university = results
        });
    
        connection.query('select a.first_name,  a.family_name from (SELECT request.username from request, university_staff as b where request.username = b.email and '+condition_sql+' GROUP BY request.username) as b, university_staff as a where a.user_name=b.username;', function (error, results, fields) {
            if (error) throw error;
            //res.send(results);
            ////console.log(results);
            university_staff = results
        });
    
        connection.query("select distinct ibm_staff from request where "+condition_sql+" group by ibm_staff", function (error, results, fields) {
            if (error) throw error;
            //res.send(results);
            ////console.log(results);
            res.send({
                request:result,
                type:type,
                university:university,
                university_staff:university_staff,
                ibm_staff:results
            })
        });
  
    
    
})








function dateChange(num = 1,date = false) {
    　　if (!date) {
    　　　　date = new Date();
    　　　　date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    　　}
    　　date += " 00:00:00";
    　　date = Date.parse(new Date(date))/1000;
    　　date -= (86400) * num;
    　　var newDate = new Date(parseInt(date) * 1000);
        //console.log('date:'+num)
    　　return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
}

  function read_request_new_request(data){
      //console.log(data);
      var date = ""+data.date.year+"-"+data.date.month+"-"+data.date.day;
      
      
      var start = ""+data.date.year+"-"+data.date.month+"-"+data.date.day+" "+data.start.hour+":"+data.start.minute+":"+data.start.second;
      var end = ""+data.date.year+"-"+data.date.month+"-"+data.date.day+" "+data.end.hour+":"+data.end.minute+":"+data.start.second;
      var sql = "INSERT INTO request (username,first_name,family_name,university,phone, state, job_title,date,start,end,participant,type, topic,address1,address2,address3,postcode,city,town, ibm_staff) VALUES ('"+data.username+"','"+data.first_name+"','"+data.family_name+"','"+data.university+"','"+data.phone+"','"+data.state+"','"+data.job_title+"','"+date+"','"+start+"','"+end+"','"+data.participant+"','"+data.type+"','"+data.topic+"','"+data.address1+"','"+data.address2+"','"+data.address3+"','"+data.postcode+"','"+data.city+"','"+data.town+"', 'Not handled')";
      //console.log(sql)
      connection.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("added");
    });
  }


function construct_condtion(data){
    condition_sql = "true"
    date = data.date;
    university = data.university;
    type = data.type;
    uni_staff=data.uni_staff;
    ibm_staff=data.ibm_staff;
    
    //console.log(data)
    if(date!='' && date!='Any'){
        
        var date_threshold = dateChange(parseInt(date))
        
        condition_sql+=' and request.date>\''+date_threshold+'\''
    }
    if(university!='' && university!='Any'){
        condition_sql+=' and request.university=\''+university+'\''
    }
    if(type!='' && type!='Any'){
        condition_sql+=' and request.type=\''+type+'\''
    }
    if(uni_staff!='' && (uni_staff.first_name!='Any' && uni_staff.family_name!=' ')){
        
        condition_sql+=' and request.first_name=\''+uni_staff.first_name+'\' and request.family_name=\''+uni_staff.family_name+'\''
    }
    if(ibm_staff!='' && ibm_staff!='Any'){
        condition_sql+=' and request.ibm_staff=\''+ibm_staff+"'"
    }
    return condition_sql
}


  //Start server
const port = process.env.port || 4600;


module.exports = app.listen(port, (req, res)=>{
    //console.log('server start at '+ port);
});;
