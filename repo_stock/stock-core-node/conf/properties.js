// Configuración de desarrollo (local)
// MAYUSCULAS para constantes de configuración!!!

module.exports.MONGODB_URI = 'mongodb://localhost:27017/stock_local';
module.exports.MYSQLDB_URI = 'mysql://root:root@127.0.0.1:3306/stock_schema';

module.exports.PUBLIC_DIRECTORY = '/public';
module.exports.APPLICATION_DOMAIN = "localhost";
module.exports.APPLICATION_PORT = 8080;
module.exports.REDIS_STORE_PORT = 6379;
module.exports.REDIS_HOST = 'localhost';
module.exports.REST_API_BASE_URL = 'http://localhost:' + this.APPLICATION_PORT + '/v1/';

// Opciones de paginado (offset, limit, maxpages)
module.exports.RESULTADOS_POR_PAGINA = 25;
module.exports.PAGINA_DEFAULT = 0;
module.exports.MAX_PAGINAS = 10;

// LOGIN & SESSION
module.exports.PASSWORD_INCORRECT = 'Password invalida';
module.exports.INACTIVE_ACCOUNT = 'La cuenta no esta activada';
module.exports.MAX_ATTEMPTS = 'Cuenta bloqueada';

// HTTP RESPONSE CODES usados por la aplicación
module.exports.OK = 200;
module.exports.CREATED = 201;
module.exports.NOT_MODIFIED = 304;
module.exports.BAD_REQUEST = 400;
module.exports.UNAUTHORIZED = 401;
module.exports.FORBIDDEN = 403;
module.exports.NOT_FOUND = 404;
module.exports.NOT_GENERATED = 405;
module.exports.INTERNAL_SERVER_ERROR = 500;