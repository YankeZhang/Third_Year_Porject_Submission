var app = require('./server')
var chai = require('chai')
var chaiHttp = require('chai-http')
var assert = require('assert')
var request = require('supertest');
var expect = require('chai').expect;
let should = chai.should()
chai.use(chaiHttp)
// describe('get request', function(){
//     it('should retrive request from db'),function(done){
//         request(app)
//         .
//         .expect(200)
//     }
// })

function dateChange(num = 0,date = false) {
    　　if (!date) {
    　　　　date = new Date();
    　　　　date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    　　}
    　　date += " 00:00:00";
    　　date = Date.parse(new Date(date))/1000;
    　　date -= (86400) * num;
    　　var newDate = new Date(parseInt(date) * 1000);
        //console.log('date:'+num)
    　　return new Date((newDate.getFullYear()) + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate());
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




describe('dateChange() method', function() {
  describe('#indexOf()', function () {
    
    it('should return a Date', function () {
        expect(dateChange(1)).to.be.a('Date')
     });
    it('should return correct Date', function () {
        expect(dateChange(10).getDate()).equal(new Date().getDate()-10)
    });
    it('should return correct month', function () {
        expect(dateChange(30).getMonth()).equal(new Date().getMonth()-1)
    });
   
    });
});

describe('App basic',()=>{
    it('should respond status 200 with exist url',(done)=>{
        chai.request(app)
        .get('/ibm/requests')
        .end((err, res)=>{
            res.should.have.status(200);
            //console.log(res.body)
            done()
        })
    })
    it('should respond status 404 from wrong url',(done)=>{
        chai.request(app)
        .get('/wrong_url')
        .end((err, res)=>{
            res.should.have.status(404);
            done()
        })
    })
   
   

    
})
describe('get requests',()=>{
    it('should respond an object',(done)=>{
        chai.request(app)
        .get('/ibm/requests')
        .end((err, res)=>{
       
            expect(typeof(res.body)).equal('object')
            done()
        })
    })
    it('ibm request page should respond a request record',(done)=>{
        chai.request(app)
        .get('/ibm/requests')
        .end((err, res)=>{
       
            expect(res.body[0]).to.have.own.property('req_id')
            expect(res.body[0]).to.have.own.property('first_name')
            expect(res.body[0]).to.have.own.property('family_name')
            expect(res.body[0]).to.have.own.property('date')
            expect(res.body[0]).to.have.own.property('university')
            done()
        })
    })
    it('calendar page should respond a request record',(done)=>{
        chai.request(app)
        .get('/components/calendar')
        .end((err, res)=>{
           
            expect(res.body[0]).to.have.own.property('first_name')
            expect(res.body[0]).to.have.own.property('university')
            expect(res.body[0]).to.have.own.property('type')
            expect(res.body[0]).to.have.own.property('start')
            expect(res.body[0]).to.have.own.property('end')
            done()
        })
    })
    it('map page should respond a university record',(done)=>{
        chai.request(app)
        .get('/components/map')
        .end((err, res)=>{
            //console.log(res.body[0])
            expect(res.body[0]).to.have.own.property('un_id')
           
            done()
        })
    })
})

describe('Login service',()=>{
    it('should login to university dashboard with university account',(done)=>{
        chai.request(app)
        .post('/login')
        .send({email:'d', password:'d'})
        .end((err, res)=>{
            expect(res.body).to.have.own.property('token')
            expect(res.body.type).equals('university')
            //console.log(res.body)
            done()
        })
    })
    it('should login to IBM dashboard with IBM account',(done)=>{
        chai.request(app)
        .post('/login')
        .send({email:'y', password:'y'})
        .end((err, res)=>{
            expect(res.body).to.have.own.property('token')
            expect(res.body.type).equals('IBM')
            //console.log(res.body)
            done()
        })
    })
    it('should fail to login with wrong email',(done)=>{
        chai.request(app)
        .post('/login')
        .send({email:'wrong', password:'wrong'})
        .end((err, res)=>{
            
            res.should.have.status(401);
            res.text.should.equal('Invalid email!')
            done()
        })
    })
    it('should fail to login with wrong password',(done)=>{
        chai.request(app)
        .post('/login')
        .send({email:'y', password:'wrong'})
        .end((err, res)=>{
            
            res.should.have.status(401);
            res.text.should.equal('Invalid password!')
            done()
        })
    })
})



describe('consturct pdf condition',()=>{
    it("should return 'true' if no restriction",(done)=>{
            restriction = {
                date:'Any',
                university:'Any',
                type:'Any',
                uni_staff:{
                    first_name:'Any',
                    family_name:''
                },
                ibm_staff:'Any'
            }
            expect(construct_condtion(restriction)).equal('true')
            done()
        
    })
    it("should return correct condition with specific restriction(1)",(done)=>{
        restriction = {
            date:'Any',
            university:'IC',
            type:'Any',
            uni_staff:{
                first_name:'Any',
                family_name:''
            },
            ibm_staff:'Any'
        }
        expect(construct_condtion(restriction)).equal("true and request.university='IC'")
        done()
    })
    it("should return correct condition with specific restriction(2)",(done)=>{
        restriction = {
            date:'Any',
            university:'Any',
            type:'Lecture',
            uni_staff:{
                first_name:'Any',
                family_name:''
            },
            ibm_staff:'Any'
        }
        expect(construct_condtion(restriction)).equal("true and request.type='Lecture'")
        done()
    })
    it("should return correct condition with specific restriction(3)",(done)=>{
        restriction = {
            date:'Any',
            university:'Any',
            type:'Any',
            uni_staff:{
                first_name:'Ben',
                family_name:'Simons'
            },
            ibm_staff:'Any'
        }
        expect(construct_condtion(restriction)).equal("true and request.first_name='Ben' and request.family_name='Simons'")
        done()
    })
    it("should return correct condition with specific restriction(4)",(done)=>{
        restriction = {
            date:'Any',
            university:'Any',
            type:'Any',
            uni_staff:{
                first_name:'Any',
                family_name:''
            },
            ibm_staff:'Yanke Zhang'
        }
        expect(construct_condtion(restriction)).equal("true and request.ibm_staff='Yanke Zhang'")
        done()
    })
    it("should return correct condition with specific restriction(5)",(done)=>{
        restriction = {
            date:'Any',
            university:'IC',
            type:'Lecture',
            uni_staff:{
                first_name:'Any',
                family_name:''
            },
            ibm_staff:'Yanke Zhang'
        }
        expect(construct_condtion(restriction)).equal("true and request.university='IC' and request.type='Lecture' and request.ibm_staff='Yanke Zhang'")
        done()
    })
    
})

