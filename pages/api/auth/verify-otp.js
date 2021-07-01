import { sendSuccess } from "utils/apiResponse"

export default (req, res) => {
    sendSuccess(res, 200, {}, `OTP verified.`)
}
