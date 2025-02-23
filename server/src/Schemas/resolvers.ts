import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import type IBookInput from '../interfaces/BookInput.js';
import  User from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';


const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {

            if (context.user) {

                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('User not authenticated');
        },
    },


    Mutation: {
        addUser: async (_parent: any, _args: any): Promise<{ token: string, user: IUserDocument }> => {
            const user = await User.create(_args)
            const token = signToken(user.username, user.email, user._id)
            return { user, token };
        },

        login: async (_parent: any, _args: any): Promise<{ token: string, user: IUserDocument }> => {

            const user = await User.findOne({ email: _args.email })
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(_args.password);

            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            const token = signToken(user.username, user.email, user._id)
            return { user, token };
        },

        saveBook: async (_parent: any, { bookData }: { bookData: IBookInput }, context: IUserContext):Promise<IUserDocument|null> => {
            if (context.user) {
                const book = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );

                return book;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (_parent: any, { bookId }: { bookId: string }, context: IUserContext):Promise<IUserDocument |null>=> {
            if (context.user) {
                const removeB = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );


                return removeB;
            }
            throw new AuthenticationError('You need to be logged');
        }

    }

}

export default resolvers;

