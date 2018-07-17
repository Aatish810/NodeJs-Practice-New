const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {ToDo} = require('./..//models/todo');
const {todosArr, populateTodos, users, populateUsers} = require('./seed/seed');
const {Users} = require('./../models/users');

beforeEach(populateUsers);
beforeEach(populateTodos);


describe('Post /todos', () => {
    it('should create a new todo', (done)=> {
        var text = 'Test todo text';

        request(app).post('/todos').set({'x-auth': users[0].tokens[0].token})
        .send({text}).expect(200)
        .expect((res)=> {
            expect(res.body.text).toBe(text)
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            ToDo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=> {
                done(e);
            })
        })
    })

    it('should not create todo with no wrong paramenter', (done)=> {
        request(app).post('/todos')
        .send({}).expect(400)
        .end((err, res)=> {
            if(err) {
                return done(err);
            }
            ToDo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => {
                done(e);
            })
        })
    })
})


describe('GET /todos', () => {
    it('should get collections data from todos', (done)=> {
        request(app).get('/todos').set({'x-auth': users[0].tokens[0].token})
        .expect(200)

        .expect((res) => {
            expect(res.body.todos.length).toBe(1);
        }).end(done);
    })

})

describe('testing todos/:id method', ()=> {
    it('should return todo doc', (done)=> {
        request(app).get(`/todos/${todosArr[0]._id.toHexString()}`)
        .set({'x-auth': users[0].tokens[0].token})
        .expect(200).expect((res)=> {
            expect(res.body.todos.text)
            .toBe(todosArr[0].text);
        }).end(done)
    })

    it('should not return todo doc if created by other user', (done)=> {
        request(app).get(`/todos/${todosArr[1]._id.toHexString()}`)
        .set({'x-auth': users[0].tokens[0].token})
        .expect(400).expect((res)=> {
            expect(res.body.todos.text)
            .toBe(todosArr[0].text);
        }).end(done)
    })
})



describe('delete todo/id', ()=>{
    it('should remove a todo', (done) => {
        var hexId = todosArr[1]._id.toHexString();
      request(app).
      delete(`/todos/:${hexId}`)
      .set({'x-auth': users[1].tokens[0].token})
      .expect(200)
      .expect((res) => {
        expect(res.body.todos._id)
        .toBe(hexId);
      }).end(done)
    })

    it('should return a todo', (done) => {
        
    })

    it('should remove a todo', (done) => {
        
    })
})


describe('patch todo/:id', () => {
    it('should update the to do', (done) => {
        var hexId = todosArr[0]._id.toHexString();
        request(app).patch(`todos/:${hexId}`).send({
            text: "I am done eating",
            completed: true
        }).expect(200)
        .expect((res) => {
            expect(res.body.todos.text).toBe('I am done eating')
            expect(res.body.todos.completed).toBe(true)
            expect(res.body.todos.compeltedAt).toBeA('number');
        }).end(done)
    })
})

describe('GET/users/me', () => {
    it('should return user if user is authemticated', (done) =>{
        request(app).get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        expect((res) =>{
            expect(res.body._id).toBe(users[0]._id).toHexString();
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done)
    })
    it('should give me 401 if not authenticated', (done) =>{
      expect(app).get('/users/me')
      .expect(401)
    expect((res) => {
        expect(res.body).toBe({})
    }).end(done)
    })
})

describe('POST/users', () => {
    it('should crate a user if data is correct', (done) => {
      var email = 'example@example.com';
      var password = '123mbns';

      request(app).post('/users').send(email, password).expect(200)
      expect((res) => {
          expect(res.header['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.email).toExist();
      })
      .end((err) => {
          if(err) {
              return done(err)
          } 
          Users.findOne({email}).then((user)=>{
              expect(user).toExist();
              expect(user.password).toNotBe(password);
              done();
          }).catch((e) => done(e))
      })
    })
    it('should return error if validation issue', (done) => {
      request(app).post('/users').send({
          emai: 'aadsjn',
          password: 'sdjdk'
      }).expect(400).end(done);
    })
    it('should not create user if email used', (done) => {
        request(app).post('/users').send({
            email: users[0].email,
            password: users[0].password
        }).expect(400).end(done)
    })
})


describe('POST/user/login', () => {
    it('should login user and return auth token', (done) => {
        request(app).post('/user/login').send({
         email: users[1].email,
         password: users[1].password
        }).expect(200)
        .expect((res)=> {
            expect(res.header['x-auth']).toExist();
        }).end((err, res) => {
            if(err) {
               return done(err);
            }
            Users.findById(user[1]._id).then((user) => {
                expect(user.token[1]).toInclude({
                    access:'auth',
                    token: res.header['x-auth']
                });
                done()
            }).catch((err) => {
                done(err)
            })
        })
    })
    it('should reject login user and return err', (done) => {
        request(app).post('/user/login').send({
            email: users[1].email,
            password: users[1].password + 'scs'
           }).expect(400)
           .expect((res)=> {
               expect(res.header['x-auth']).toNotExist();
           }).end((err, res) => {
               if(err) {
                  return done(err);
               }
               Users.findById(user[1]._id).then((user) => {
                   expect(user.tokens.length).toBe(1);
                   done()
               }).catch((err) => {
                   done(err)
               })
           })
    })
})


describe('DELETE users/me/token', () => {

    it('should remove auth token on logout', (done) => {
        request(app).delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token).expect(200)
        .end((err, res) =>{
          if(err) {
           return done(e)
          }
          Users.findById(users[0]._id).then((user) => {
           expect(users.tokens.length).toBe(0)
           done();
          }).catch((e) => done(e))
        })
    })
})
