const dns = require('node:dns');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dnsServers = process.env.DNS_SERVERS
      ?.split(',')
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
