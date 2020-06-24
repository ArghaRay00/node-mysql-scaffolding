import { Router } from 'express';
var router = Router();
import * as controller from './controller';
import * as auth from '../../auth/auth.service';

router.post('/register', controller.register_new_user);

router.get('/:id', auth.isLoggedin(), controller.get_user_details);

module.exports = router;