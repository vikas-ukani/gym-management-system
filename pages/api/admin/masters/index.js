import { sendFailer, sendSuccess } from 'utils/apiResponse'
import { masters } from 'data/master_submasters.json'
import { where } from 'underscore'

export default (req, res) => {
    var lists = [];
    if ('all' in req.query && req.query.all == true) {
        lists = masters
    } else {
        lists = where(masters, { parent_id: null })
    }
    sendSuccess(res, 200, { list: lists, count: lists.length }, `Masters retrived successfully.`)
}