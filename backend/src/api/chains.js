import resource from 'resource-router-middleware';
import chains from '../models/chains';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'facet',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let chian = chains.find( chains => chain.id===id ),
			err = chain ? null : 'Not found';
		callback(err, chain);
	},
	//
	// /** GET / - List all entities */
	// index({ params }, res) {
	// 	res.json(facets);
	// },
	//
	// /** POST / - Create a new entity */
	// create({ body }, res) {
	// 	body.id = facets.length.toString(36);
	// 	facets.push(body);
	// 	res.json(body);
	// },
	//
	// /** GET /:id - Return a given entity */
	// read({ facet }, res) {
	// 	res.json(facet);
	// },
	//
	// /** PUT /:id - Update a given entity */
	// update({ facet, body }, res) {
	// 	for (let key in body) {
	// 		if (key!=='id') {
	// 			facet[key] = body[key];
	// 		}
	// 	}
	// 	res.sendStatus(204);
	// },
	//
	// /** DELETE /:id - Delete a given entity */
	// delete({ facet }, res) {
	// 	facets.splice(facets.indexOf(facet), 1);
	// 	res.sendStatus(204);
	// }
});
