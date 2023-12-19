const { once } = require("events");
const { Pool } = require("pg");
const build = require("pino-abstract-transport");
const SonicBoom = require("sonic-boom");

module.exports = async function (opts) {
  const { connectionString, table, column, destination: dest } = opts;

  const destination = new SonicBoom({
    dest: dest ?? 1, // 1 is stdout, 2 is stderr
    sync: false,
  });
  await once(destination, "ready");

  const pool = new Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    ssl: true,
  });

  const client = await pool.connect();

  return build(
    async function (source) {
      for await (const obj of source) {
        try {
          await insertLog(client, table, column, obj);
          await manageDestination(destination, obj);
        } catch (err) {
          console.error("Failed to insert log into database:", err);
        }
      }
    },
    {
      async close(err) {
        await cleanup(err, client, destination);
      },
    }
  );
};

async function insertLog(client, table, column, obj) {
  await client.query(`INSERT INTO ${table}(${column}) VALUES($1)`, [obj]);
}

async function manageDestination(destination, obj) {
  const toDrain = !destination.write(JSON.stringify(obj) + "\n");
  if (toDrain) {
    await once(destination, "drain");
  }
}

async function cleanup(err, client, destination) {
  if (err) console.error("Closing transport with error:", err);
  await client.end();
  destination.end();
  await once(destination, "close");
}
