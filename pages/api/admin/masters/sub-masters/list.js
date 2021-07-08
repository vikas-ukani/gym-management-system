import { sendFailer, sendSuccess } from 'utils/apiResponse'
import { masters } from 'data/master_submasters.json'
import { where } from 'underscore'

export default (req, res) => {
    let { parent_id } = req.query
    let lists = masters
    let filterd = where(lists, { parent_id: parseInt(parent_id) })
    sendSuccess(res, 200, { list: filterd, count: filterd.length }, `Sub Masters retrived successfully.`)
}