const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ msg: 'No tiene un token generado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Sin autorizacion' });
  }
};



exports.adminOnly = async (req, res, next) => {
    try {
        const user = await user.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "No existe ese usuario" });
        if (user.role !== "admin") return res.status(403).json({ msg: "Acceso Prohibido" });
        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
