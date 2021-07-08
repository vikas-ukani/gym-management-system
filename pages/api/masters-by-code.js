
import { sendSuccess } from "utils/apiResponse"
import { masters } from 'data/master_submasters.json'
import { where } from "underscore"


export default (req, res) => {
    const { code } = req.query
    let allMasters = masters

    let whereCode = where(allMasters, { code: code })
    console.log('found', whereCode);
    let whereSubMaster = where(allMasters, { parent_id: whereCode.id })

    console.log('Checking', code, whereCode);
    sendSuccess(res, 200, { data: whereSubMaster }, "Success")
}
