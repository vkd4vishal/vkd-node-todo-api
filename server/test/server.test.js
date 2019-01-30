const expect = require('expect');
const request = require('supertest');

var {ObjectId} = require('mongodb');


const {app} = require('./../server');
const {Todo} = require('../models/todo');

var todos = [{
    _id : new ObjectId(),
    text : 'first todos for get'
},{ 
    _id : new ObjectId(),
    text : 'second todos for get',
    completed: true,
    completedAt: 333
}];

beforeEach((done)=>{
    Todo.deleteMany ({}).then(()=>{
        return Todo.insertMany(todos);
    })
    .then(()=> done());
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'Test todo test';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });

    it('should not create todo with invalid data ',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            });
    });


});

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});



describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
              
            }).end(done);
    });

    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectId;
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        request(app)
            .get('/todos/234')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      var hexId = todos[1]._id.toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.findById(hexId).then((todo) => {
            expect(todo).toBeFalsy();
            done();
          }).catch((e) => done(e));
        });
    });
    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectId;
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        request(app)
            .delete('/todos/234')
            .expect(404)
            .end(done);
    });
});  
describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
       expect(typeof res.body.todo.completedAt).toBe('number');
        //expect(res.body.todo).to.have.property(completedAt).that.is.a('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed',(done)=>{
      var hexId = todos[1]._id.toHexString();
      var text = 'yo yo honey singh';

      request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
       expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);

  })

});
    