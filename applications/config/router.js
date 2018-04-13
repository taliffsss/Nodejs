var router = require("express").Router();

/*------Login Module------*/
router.get("/name", getName);
router.get("/email", getEmail);
/*------End------*/

/*------Logout Module------*/
router.get("/Logout", getName);
/*------End------*/