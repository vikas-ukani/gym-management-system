import { sendFailer, sendSuccess } from 'utils/apiResponse'
import { data } from 'data/workspaces.json'

export default (req, res) => {
    console.log('IN ' );
    let { id } = req.query
    let data = data
    console.log('req', id, data);
    sendSuccess(res, 200, { list: data, count: data.length }, `Masters retrived successfully.`)
}