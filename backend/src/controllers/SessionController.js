const connection = require('../database/connection');
module.exports = {
    async create(request, response) {
        try {
            let { id } = request.body;
            // let ong_id = request.headers.authorization;
            let ong = await connection('ongs')
            .select('name')
            .where('id', id)
            .first();
        if (!ong)
            return response.status(400).json({ error : 'Não foi encontrada nenhuma ONG para o ID.'});                   
        return response.json(ong);                   
        } catch (error) {
            console.log(error);
            return response.status(400).json();
        }
    },    

}