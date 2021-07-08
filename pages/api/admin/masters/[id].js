import { sendFailer, sendSuccess } from 'utils/apiResponse'
import { masters } from 'data/master_submasters.json'

export default (req, res) => {
    console.log('req', req.query);
    sendSuccess(res, 200, { list: masters, count: masters.length }, `Masters retrived successfully.`)
}