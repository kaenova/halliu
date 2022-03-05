export default function errorHeader(req, res, next){
  req["Error"] = null
  next()
}