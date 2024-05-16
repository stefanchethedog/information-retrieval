const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { Client } = require("@elastic/elasticsearch");

const app = express();
const port = 3001;

const esClient = new Client({
  node: "https://e61eef22cc3248a298bb08f2d896b27b.us-central1.gcp.cloud.es.io:443",
  cloud: {
    id: "dad423556c9c43b8a49a25d8f9dc5b89:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGU2MWVlZjIyY2MzMjQ4YTI5OGJiMDhmMmQ4OTZiMjdiJGZkNDVlNGJhNTM5NzQyNTBhZTgwMThhNTRiZGI1NDZk",
  },
  auth: {
    apiKey: "Z0tsamZvOEJTM016c3JlT0JPd2w6RWNzb0NMaGZTUkc2alVpRThXb2pCUQ==",
  },
});

const inputDir = path.join(__dirname, "inputFiles");

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post("/create-index", async (req, res) => {
  try {
    const indexExists = await esClient.indices.exists({ index: "my_index" });

    if (!indexExists) {
      await esClient.indices.create({
        index: "my_index",
        body: {
          mappings: {
            properties: {
              title: { type: "text" },
              content: { type: "text" },
              timestamp: { type: "date" },
              filePath: { type: "keyword" },
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
        filePath: filePath,
      });
    }

    const bulkResponse = await esClient.bulk({
      body: bulkOperations,
    });
    if (bulkResponse.errors) {
      res
        .status(500)
        .json({ message: "Bulk index errors", errors: bulkResponse.items });
    } else {
      console.log("Success??");
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
  const { query, field, page = 0, size = 5 } = req.query;
  const from = page * size;

  try {
    const response = await esClient.search({
      index: "my_index",
      from,
      size,
      body: {
        query: {
          match: {
            [field]: query,
          },
        },
      },
    });

    console.log(response);

    const totalHits = response.hits.total.value;
    const totalPages = Math.ceil(totalHits / size);

    res.status(200).json({
      data: response.hits.hits,
      totalPages,
      currentPage: parseInt(page, 10),
      totalItems: totalHits,
    });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/download/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    // Fetch file content from Elasticsearch based on the file ID
    const body = await esClient.get({
      index: "my_index",
      id: fileId,
    });
    // Assuming the file content is stored in a field named "file_content"
    const fileContent = body._source.content;

    // Serve the file content for download
    res.setHeader("Content-Disposition", `attachment; filename=${fileId}`);
    res.send(fileContent);
  } catch (error) {
    console.error("Error downloading file from Elasticsearch:", error);
    res.status(500).send("Error downloading file from Elasticsearch");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
