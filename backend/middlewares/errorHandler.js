
module.exports = ({ e, res, next }) => {
    switch (e?.code) {
        case 500:
            res.status(500).json({
                "success": false,
                "error": e.message || "Server Error"
            });
            break;
        case 404:
            res.status(404).json({
                "success": false,
                "error": e.message || "Resource not found"
            });
            break;
        case 401:
            res.status(401).json({
                "success": false,
                "error": e.message || "Unauthorized"
            });
            break;
        case 403:
            res.status(403).json({
                "success": false,
                "error": e.message || "Forbidden"
            });
            break;
        case 409:
            res.status(403).json({
                "success": false,
                "error": e.message || "Already Exist"
            });
            break;

        default:
            res.status(404).json({
                "success": false,
                "error": e.message || "Resource not found"
            });
            break;
    }
}
