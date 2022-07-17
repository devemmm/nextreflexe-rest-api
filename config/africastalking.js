const AfricasTalking = require('africastalking')

const africastalking = AfricasTalking({
    apiKey: process.env.AFRICASTALKING_API_KEY,
    username: process.env.AFRICASTALKING_USERNAME
});



const sendSMS = ({ message, receiver }) => {
    try {
        africastalking.SMS.send({
            to: "+250788596281",
            message: message,
            // from: 'GENUINE KTE'
        }).then((result) => {
            console.log({ result })
        }).catch((eror) => {
            console.log({ eror });
        })

    } catch (ex) {
        console.error({ ex });
    }
}

module.exports = { sendSMS }