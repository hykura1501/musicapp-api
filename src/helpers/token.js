import jwt from 'jsonwebtoken';
export const generateToken = (id) => { 
	const options = {
		expiresIn: '2d',
	};
	const token = jwt.sign(id, process.env.JWT_SECRET_KEY, options);
	return token;
}
