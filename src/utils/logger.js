const logger = (msg, type = "log")=>{

    const now = new Date().toLocaleString( 'sv', { timeZoneName: 'short' } )
    switch (type) {
        case "error":
            console.error(`[ERROR-LOG]${now} : ${msg}`);
            break;
        case "log":
        default:
            console.error(`[INFO-LOG]${now} : ${msg}`);
            break;
    }
}

module.exports = logger 