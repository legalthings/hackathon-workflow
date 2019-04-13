FoodFlow Backend
================

This backend is a proxy between a LTO node and transforms the data to be consumed by the web app.
It exposes only a single public api endpoint on `GET /api/chains/{chainId}/`.

To run the LTO node backend make sure you have docker installed and run:

```bash
docker-compose up
```

When the node in running you can run the example node scripts to create sample events:

```bash
npm run create_events
```

Now you can run the server with:

```bash
npm run dev
```
