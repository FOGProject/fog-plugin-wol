const wol = require('node-wol');
module.exports = {
  friendlyName: 'Emit',
  description: 'Emit wol.',
  inputs: {
    mac: {
      friendlyName: 'MAC Address',
      description: 'The MAC address to wake up',
      required: true,
      type: 'string',
      regex: /^[0-9a-f]{1,2}([.:-])[0-9a-f]{1,2}(?:\1[0-9a-f]{1,2}){4}$/i
    },
    ip: {
      friendlyName: 'IP Address',
      description: 'The IP Address to wake up, if known',
      type: 'string'
    }
  },
  exits: {
    success: {
      description: 'All done.',
    }
  },
  fn: async function (inputs, exits) {
    let mac = inputs.mac,
      ip = inputs.ip,
      ippatt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ip === undefined ||
      !ippatt.test(ip)
    ) {
      await wol.wake(mac, (err) => {
        if (err) return exits.error(err);
        return exits.success({message: `WOL request sent to MAC: ${mac}`})
      });
    }
    await wol.wake(mac, {address: ip}, (err) => {
      if (err) return exits.error(err);
      return exits.success({message: `WOL request sent to MAC: ${mac} with IP: ${ip}`})
    });
  }
};
