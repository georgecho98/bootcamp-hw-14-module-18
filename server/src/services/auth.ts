
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   const token = context.token;

//   if (!token) {

//     throw new GraphQLError('Authentication token is required',{
//       extensions:{
//         code:'UNAUTHENTICATED',
//         http:{status:401}      }

//     })
//   }
// if (authHeader) {
//   const token = authHeader.split(' ')[1];

//   const secretKey = process.env.JWT_SECRET_KEY || '';

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Forbidden
//     }

//     req.user = user as JwtPayload;
//     return next();
//   });
// } else {
//   res.sendStatus(401); // Unauthorized
// }
// };


export const authenticateToken = ({req}:any) =>{
  let token = req.budy.token || req.query.token ||req.headers.authorization;

  if(req.headers.authorization){
    token = token.split(' ').pop().trim();
  }
  if (!token){
    return req;
  }

  try{
    const{data}: any=jwt.verify(token, process.env.JWT_SECRET_KEY || '',{maxAge: '2hr'});
    req.user= data;
  }catch (err){
    console.log('Invalid token')
  }

  return;
  }




export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
