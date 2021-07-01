export const sendFailer = (res, statusCode = 400, data = {}, message) => {
    res.status(422).json({
        statusCode,
        data,
        message
    })
}
export const sendSuccess = (res, statusCode = 200, data = {}, message) => {
    res.status(200).json({
        statusCode,
        data,
        message
    })
}