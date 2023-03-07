export default  func => {
    return (req, res, next) => {
        console.log('qondera')
        func(req, res, next).catch(next)
    }
}
