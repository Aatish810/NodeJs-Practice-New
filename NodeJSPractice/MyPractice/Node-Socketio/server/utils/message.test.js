var expect = require('expect');

var {generateMessage} = require('./message')

describe('generate message test', () => {
    it('should generate code message code', () => {
        var message = generateMessage('Aatish', 'Hello All')
        expect(message.createdAt).toBeA('number');
        expect(message.from).toBeA('string')
        expect(message.from).toEqual('Aatish')
    })
})