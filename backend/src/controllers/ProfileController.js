const connection = require('../database/connection');
 module.exports = {
    async index(request, response) {
        try {
            let ong_id = request.headers.authorization;
            let incidents = await connection('incidents')
            .select('*')
            .where('ong_id', ong_id);
        return response.json(incidents);                   
        } catch (error) {
            console.log(error);
            return response.status(400).json();
        }
    },
            


}