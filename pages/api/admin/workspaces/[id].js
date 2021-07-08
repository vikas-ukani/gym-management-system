import { sendSuccess } from "utils/apiResponse"
import { data } from 'data/workspaces.json'
import { where } from "underscore"

export default (req, res) => {
    const { id } = req.query
    let datas = where(data, { id: parseInt(id) })
    sendSuccess(res, 200, { data: datas[0] }, "Message")
}