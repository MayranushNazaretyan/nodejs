const { Transform } = require("stream");

class ReplaceTextStream extends Transform {
    constructor(data) {
        super();
        this.data = data;
    }

    _transform(chunk, encoding, done) {
        let modifiedChunk = chunk.toString('utf8');
        const dataArr = Object.keys(this.data);
        for (const value of dataArr) {
            const pattern = new RegExp(`{${value}}`, 'g');

            if (modifiedChunk.match(pattern)) {
                modifiedChunk = modifiedChunk.replace(pattern, this.data[value]);
            }
        }

        this.push(modifiedChunk);
        done();
    }
}

module.exports = ReplaceTextStream;