const express = require("express");
const fs = require("fs");
const path = require("path");
const { Client } = require("@elastic/elasticsearch");

const app = express();
const port = 3001;

const esClient = new Client({
  node: "https://e61eef22cc3248a298bb08f2d896b27b.us-central1.gcp.cloud.es.io:443",
  auth: {
    apiKey: {
      id: "PretrazivanjeAplikacija",
      api_key: "elNiNWZJOEJIOEZUWGFqYkVUbFU6Q1ZZOGNtejRRY0cwa2ZJUk1abVhuQQ==",
    },
  },
});

const inputDir = path.join(__dirname, "inputFiles");

app.use(express.json());

app.post("/create-index", async (req, res) => {
  try {
    const indexExists = await esClient.indices.exists({ index: "my_index" });
    if (!indexExists.body) {
      await esClient.indices.create({
        index: "my_index",
        body: {
          mappings: {
            properties: {
              title: { type: "text" },
              content: { type: "text" },
              timestamp: { type: "date" },
            },
          },
        },
      });
    }

    const files = fs.readdirSync(inputDir);
    const bulkOperations = [];

    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      bulkOperations.push({
        index: { _index: "my_index" },
      });

      bulkOperations.push({
        title: file,
        content: content,
        timestamp: new Date().toISOString(),
      });
    }

    const { body: bulkResponse } = await esClient.bulk({
      body: bulkOperations,
    });

    if (bulkResponse.errors) {
      res
        .status(500)
        .json({ message: "Bulk index errors", errors: bulkResponse.items });
    } else {
      res
        .status(200)
        .json({ message: "Index created and files indexed successfully" });
    }
  } catch (error) {
    console.error("Error creating index and indexing files:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  const { query, field, page = 0, size = 10 } = req.query;
  const from = page * size;

  try {
    const { body } = await esClient.search({
      index: "my_index",
      from,
      size: parseInt(size, 10),
      body: {
        query: {
          match: {
            [field]: query,
          },
        },
      },
    });

    const totalHits = body.hits.total.value;
    const totalPages = Math.ceil(totalHits / size);

    res.status(200).json({
      data: body.hits.hits,
      totalPages,
      currentPage: parseInt(page, 10),
      totalItems: totalHits,
    });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
