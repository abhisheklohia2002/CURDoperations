const config = require("../config/config");
const modelUser = require("../model/Schema")
const jwt = require("jsonwebtoken")


//read ALl User
console.log(config.name)
const GetAllUser = async(req,res)=>{

    try {
       const result = await modelUser.find({});
       res.send(result)
    } catch (error) {
        console.log(error,"error in Get_Side")
    }
}

//Create User
const CreateUser = async(req,res)=>{
    const {name,email,password,mobile} = req.body;
    
    try {
        
        if(name!=="" || !email!== "" || password !== "" || mobile !== ""){
            const store = new modelUser({
                name:name,email:email,password:password,mobile:mobile
            })

                const Check_Email = await modelUser.findOne({email:req.body.email});
               
                if(Check_Email){
                    res.status(404).send({message:"please try Again"})
                }
                else {
                    const {_id}  = store
                    const token =  jwt.sign({_id}, config.name, { expiresIn: '1h' })
                    const result =  await store.save();
                    res.status(200).send({result,success:true,token:token})
                    return;
                }


        }


else {
    res.send({msg:"Please Check Validations"})
}

        
    } catch (error) {
        console.log("Error=====Post",error)
    }
}

//Delete User By Id
const DeleteById = async(req,res)=>{
    const showById   = req.params.id;
console.log(showById)
    try {
         const ID = await modelUser.findByIdAndDelete(showById);
       
        if(ID){
            return res.send(ID)
        }
        else {
            return res.send({msg:"Not Found"})
        }
    } catch (error) {
        console.log("error in Delete",Error)
    }
}

//Update By Id 
const UpdateById = async(req,res)=>{
    const {name,email,password,mobile} = req.body;
    const updateById = req.params.id
    try {
        
            if(name!== "" || !email !== "" || password !== "" || mobile !== ""){
                const UpdateReq = await modelUser.findByIdAndUpdate(updateById, { name:name,email:email,mobile:mobile,password:password})

                    if(UpdateById){
                        res.send({msg:UpdateReq})
                    }
                    else {
                        res.send({msg:"Not Update"})
                    }


            }

             else {
                res.status(400).send({Msg:"please Check Your Validation"})
             }



    } catch (error) {
        console.log("error In Update",error)
    }
}



//sortBy Name and Pagination

const SortBYName = async(req,res)=>{
  


    const {name,sort} = req.query;
    const myObj = {};
    let page = +req.query.page || 1;
    let limit = +req.query.limit || 3;
    let skip = (page-1)*limit;
    
    
        try {
    
            if(name){
                myObj.name = name;
    
            }
            let apiCall = modelUser.find(myObj);
    
            apiCall = apiCall.skip(skip).limit(limit)
            if(sort){
               let sortFix = sort.replace(","," ");
    apiCall = apiCall.sort(sortFix)
            }
    const find_detail = await apiCall;
    res.send(find_detail);
    
           
        } catch (error) {
            console.log(`ER============== in Sort`,error)
        }

}






module.exports = {
    GetAllUser,CreateUser,DeleteById,UpdateById,SortBYName
}