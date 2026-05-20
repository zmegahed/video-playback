let latestCommand = null;

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return Promise.resolve(req.body);
  }

  if (req.body && typeof req.body === "string") {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (error) {
      return Promise.reject(new Error("Invalid JSON body."));
    }
  }

  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();

      if (body.length > 100000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body."));
      }
    });

    req.on("error", reject);
  });
}

function cleanVideo(video) {
  if (!video || typeof video !== "object") {
    return null;
  }

  return {
    label: typeof video.label === "string" ? video.label.slice(0, 200) : "Untitled video",
    url: typeof video.url === "string" ? video.url.slice(0, 2000) : ""
  };
}

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      command: latestCommand
    });
    return;
  }

  if (req.method === "POST") {
    try {
      const body = await readJsonBody(req);
      const type = typeof body.type === "string" ? body.type : "";
      const allowedTypes = ["play", "pause", "resume", "reset", "blank", "ping"];

      if (!allowedTypes.includes(type)) {
        sendJson(res, 400, {
          ok: false,
          error: "Invalid command type."
        });
        return;
      }

      const video = cleanVideo(body.video);

      if (type === "play" && (!video || !video.url)) {
        sendJson(res, 400, {
          ok: false,
          error: "Play commands require a video URL."
        });
        return;
      }

      latestCommand = {
        id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2),
        type,
        video,
        createdAt: new Date().toISOString()
      };

      sendJson(res, 200, {
        ok: true,
        command: latestCommand
      });
    } catch (error) {
      sendJson(res, 500, {
        ok: false,
        error: error.message || "Could not save command."
      });
    }

    return;
  }

  sendJson(res, 405, {
    ok: false,
    error: "Method not allowed."
  });
};
