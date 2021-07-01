import { default_user } from 'data/auth.json'
import { sendFailer, sendSuccess } from 'utils/apiResponse'

export default (req, res) => {
    const { email, password } = req.body
    if (email != "subadmin@mailinator.com" || password !== "subadmin@123" ) {
        sendFailer(res, 422, {}, `Invalid credentials...`)
        return false
    }
    sendSuccess(res, 200, default_user, `Login Successfully done.`)
}
