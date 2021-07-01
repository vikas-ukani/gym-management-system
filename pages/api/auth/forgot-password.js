import { sendSuccess } from "utils/apiResponse"

export default (req, res) => {
    sendSuccess(res, 200, {}, `We have send you an mail on your ${req?.body?.email}.`)
}
