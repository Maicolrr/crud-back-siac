const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../model/userModel")
const nodemailer = require("nodemailer");

//@Desc     Register user
//@Route    POST /api/users
//@Access   Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name,dni,email,password} = req.body

    if(!name || !dni || !email || !password){
        res.status(400)
        throw new Error('Please add all fiels')
    }

    // check if user exist
    const userExists = await User.findOne({dni})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    // salt valores aleatorios se agg a la contraseña antes de ser hasheada (contra)+salt osea pepepe29+salt =pepe29@+973G

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create User

    const user = await User.create({
        name,
        dni,
        email,
        password: hashedPassword

    })

    if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})




//@Desc     Auth new user
//@Route    POST /api/users/login
//@Access   Public
const loginUser = asyncHandler(async(req,res)=>{

    const {dni,password} = req.body
   
    // check for user dni
    const user =  await User.findOne({dni})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            dni: user.dni,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    // res.json({message: 'Login User'})
})


//@Desc     Get data user
//@Route    GET /api/users/me
//@Access   Private
const getMe = asyncHandler(async(req,res)=>{

  // tener en cuenta que se usa el token en postman que se genera cuando realiza el login
    const {_id,name,dni,email} = await User.findById(req.user.id)

    res.status(200).json({
        id : _id,
        name,
        dni,
        email
    })
})


//@Desc     Forgot Password
//@Route    POST /api/users/forgot-password
//@Access   Public
const forgotPw = asyncHandler(async(req,res)=>{
    const {email} = req.body
    
    try {
        const authEmail = await User.findOne({email})
        if(!authEmail){
            return res.status(400).json({stack: "invalid data"})
        }

        const secretKey = process.env.JWT_SECRET + authEmail.password
        const token = jwt.sign({email: authEmail.email, id: authEmail._id}, secretKey, {
            expiresIn: "5m"
        })
        const linkReset = `<a href="http://localhost:5000/api/users/reset-password/${authEmail._id}/${token}">Click For Reset<a/>`;
        
        contentHTML = `
        <h1>User Information</h1>
        <p>"Desde la logistica de SIAC CORPORATION le hacemos envio de su link para el restablecimiento de su contraseña. 
        Muchas Gracias por usar nuestro aplicativo."</p>
        <ul>
            <li>Reset Password: ${linkReset}</li>
        </ul>
    `;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "corporationsiac@gmail.com",
              pass: "mwbtsbmxjymgkhgu",
            },
          });
      
          var mailOptions = {
            from: '"SIAC COMPANY" <corporationsiac@gmail.com>',
            to: authEmail.email,
            subject: "Forgot password ✔",
            html: contentHTML,
          };
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.status(400).json({stack: "Email error"})
            } else {
              
               res.json({Email: "Submitted successfully" })
            }
          });
          
        } catch (error) { }
      });

//@Desc     Reset Password
//@Route    POST /api/users/reset-password
//@Access   Public
const resetUpdate = asyncHandler( async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const authEmail = await User.findOne({ _id: id });
  if (!authEmail) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + authEmail.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.json({ email: verify.email, data: password,  status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
      

//Generate Token
// si expira el token pide al user, volver a logearse
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '20d'
    })
}


//@Desc     update user
//@Route    PUT /api/users/update-User/:id
//@Access   private
const updateUser = asyncHandler (async (req,res)=>{
  const {id} = req.params;
  const {name, email} = req.body;

  const user = await User.findOne({_id: id })

  if(user){

    User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: name,
          email:email,
        }
      }
    )
  
    res.json(
      {
        _id: user.id,
        name: user.name,
        dni: user.dni,
        email: user.email,
        token: generateToken(user._id),
        status: "update verified",
      }
    )
  
  }else{
    res.status(200).json({ status: "User Not Exists!!" });
  }

})



//@Desc     delete user
//@Route    DELETE /api/users/delete/id
//@Access   private
const deleteUser = asyncHandler ( async (req,res)=>{


  const {id} = req.body;

  const user = await User.findOne({_id: id })

    if(user){
      
      await User.remove()
      res.status(200).json({status: "user deleted successfully" })
    } else{
      
      res.status(200).json({status: "User Not Exists!!" })
    }
    

})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPw,
  resetUpdate,
  updateUser,
  deleteUser
    
}