const assert = require('chai').assert;
const Add = require('../server/Add');

//adding a location should be doable with one argument (name) or two arguments (location and parent)
//adding a location should fail(??) if the id (name) is the same

describe('add', () =>{
    describe('location', () =>{
        it('adding a location with one argument', () =>{
            Add.addLoc({location_id:'lol', parent:'loll'})
            // .then(r=>{
            // })
        })
    })
})