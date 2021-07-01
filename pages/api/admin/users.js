import { sendFailer, sendSuccess } from 'utils/apiResponse'
import { users_data } from 'data/users.json'

export default (req, res) => {
    sendSuccess(res, 200, { list: users_data, count: users_data.length }, `Users retrived successfully.`)
}
