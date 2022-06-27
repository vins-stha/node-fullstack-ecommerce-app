import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import { SUPERUSER } from '../util/secrets'

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1 })
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  const email = user.email;
  const username = user.username

  if (!email || !username) {
    throw new BadRequestError('Empty required field/s.')
  }

  const emailCount = await User.countDocuments({ email: email })
  const usernameCount = await User.countDocuments({ username: username })

  if (emailCount > 0 || usernameCount > 0) {
    throw new BadRequestError('Email or username already in use.')
  }

  return user.save()
}

const find = async (id: string): Promise<UserDocument[] | UserDocument> => {
  const user = await User.find({ _id: id }).populate('orders', {
    total: 1,
    dateCreated: 1,
  })

  if (!user) throw new NotFoundError(`User "${id}" not found`)

  return user
}

const deleteById = async (id: string): Promise<UserDocument> => {
  const user = await User.findByIdAndDelete(id)
  if (!user) throw new NotFoundError(`User "${id}" not found`)
  return user
}

const updateByName = async (
  id: string,
  updatedData: Partial<UserDocument>
): Promise<UserDocument> => {
  const user = await User.findByIdAndUpdate(id, updatedData, { new: true })
  if (!user) throw new NotFoundError(`User "${id}" not found`)

  return user
}

const findOrCreate = async (parsedToken: any): Promise<UserDocument | any> => {
  // console.log('PARSED TOKEN email ', parsedToken?.payload?.email);
  try {
    const userExist = await User.findOne({ email: parsedToken?.payload?.email })

    if (!userExist) {
      const user = new User({
        username: `${parsedToken?.payload?.email}`,//`${(parsedToken?.payload?.given_name).trim()}.${(parsedToken?.payload?.family_name).trim()}`,
        email: `${parsedToken?.payload?.email}`,
        isAdmin: parsedToken?.payload?.email === SUPERUSER ? true : false,

        personalDetail: {
          fname: `${parsedToken?.payload?.given_name}`,
          lname: `${parsedToken?.payload?.family_name}`,
          profilePicURL: `${parsedToken?.payload?.picture}`
        }
      });

      return user.save()
    } else return userExist
  } catch (e) {}
};

const findUserByEmail = async (email:string)=>{

  try {
    const user = await User.findOne({email});
    if(!user)
      throw new NotFoundError("User not found")
    return user
  }catch(e){
    console.log('Error finding user',e)
  }
};

export default { findAll, create, find, deleteById, updateByName, findOrCreate,findUserByEmail }
