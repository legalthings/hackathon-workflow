import resource from 'resource-router-middleware';
import ChainModel from '../models/chains';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'chain',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */

	load(req, id, callback) {
		const chainModel = new ChainModel();
		let chainProm = chainModel.loadChain(id),
			chain = null,
			err = null;
		chainProm.then(function (result) {
			chain = result;
			callback(err, chain);
		}, function (err) {
			err = err.message;
			callback(err, chain);
		}).catch(function () {
			err = 'Error';
			callback(err, chain);
		})
	},

	read({ chain }, res) {
		res.json(chain);
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
