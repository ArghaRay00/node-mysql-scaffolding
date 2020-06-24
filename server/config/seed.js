import config from './environment';
import { create_user_table } from '../api/user/model';

export default async function initialize_database() {
    if(config.getConstants().seedDB) {
        try {
            create_user_table();
        } catch(e) {
            console.log('User table creation failed');
        }
    }
}