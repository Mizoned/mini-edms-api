import { MainConfig } from '../interfaces/config.interface';

export default (): MainConfig => ({
    port: parseInt(process.env.API_PORT, 10) || 3000,
});