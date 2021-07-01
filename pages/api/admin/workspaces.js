import { sendFailer, sendSuccess } from 'utils/apiResponse'
import { data } from 'data/workspaces'

export default (req, res) => {
    const { owner_id } = req.query

    const filterdData = data.filter((list) => list.owner_id  == owner_id)
    sendSuccess(res, 200, filterdData, `Workspace retrived successfully.`)
}
