const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {ToDo} = require('./..//models/todo');
const {todosArr, populateTodos, users, populateUsers} = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);


describe('Post /todos', () => {
    it('should create a new todo', (done)=> {
        var text = 'Test todo text';

        request(app).post('/todos')
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
        request(app).get('/todos').expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    })

})

describe('testing todos/:id method', ()=> {
    it('should return todo doc', (done)=> {
        request(app).get(`/todos/${todosArr[0]._id.toHexString()}`)
        .expect(200).expect((res)=> {
            expect(res.body.todos.text)
            .toBe(todosArr[0].text);
        }).end(done)
    })
})



describe('delete todo/id', ()=>{
    it('should remove a todo', (done) => {
        var hexId = todosArr[1]._id.toHexString();
      request(app).
      delete(`/todos/:${hexId}`).expect(200)
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
