const { NODE_ENV, JWT_SECRET } = process.env;
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;



const generateToken = (id) =>
  sign(
    { id },
    NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    { expiresIn: '7d' }
  );


const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
      (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      }
    );
  });


export default async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {

    return res.status(401).json({ message: 'Необходима авторизация' });
  }

  try {
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {

    return res.status(401).json({ message: 'Необходима авторизация' });
  }
};

export { generateToken, verifyToken };
