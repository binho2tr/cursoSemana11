const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        let { page = 1 } = request.query;
        let [count]  = await connection('incidents')
                                .count();
        let incidents = await connection('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
                                .limit(5)
                                .offset((page - 1) * 5);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);        
    },
    async create(request, response) {
        let ong_id = request.headers.authorization;
        let { title, description, value } = request.body;
        let [id] = await connection('incidents')
                            .insert({
                                title,
                                description,
                                value,
                                ong_id,
                            });
        return response.json({ id });
    },
    async delete(request, response) {
        let ong_id  = request.headers.authorization;
        let { id } = request.params;
        let incident = await connection('incidents')
                                .select('ong_id')
                                .where('id', id)
                                .first();
        console.log(incident, ong_id);
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error : 'Sem autorização.' });
        }
        
        await connection('incidents')
                .delete()
                .where('id', id);
        return response.status(204).send();
    }



}