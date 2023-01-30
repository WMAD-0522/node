const header = (req, res, next) => {
    res.setHeader('X-Powered-By', 'Node.js');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

export default header;