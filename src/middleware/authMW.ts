const isLoggedIn = function (req: any, res: any, next: Function) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({
            message: "unathorized!"
        });
    }
}

export default isLoggedIn