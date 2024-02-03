const asyncHandler = (requestHandler) => {
 return  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) =>
      console.log(err)
    );
  };
  
};
export default asyncHandler

//second way
// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{
// await fn(req,res,next)
//     }catch (error){
// res.status(err.code||500).json({
//     success:false,
//     message:err.message
// })
//     }
//     function asyncHandler(fn) {
//       return async(req,res,next) {
//         try{
//           await fn(req,res,next)
//               }catch (error){
//           res.status(err.code||500).json({
//               success:false,
//               message:err.message
//           })
//       }
      
//     }
// }
// const handler = (fn)=>()=>{}
// function handler (fn){
//    return  function  (){

//     }

// }
