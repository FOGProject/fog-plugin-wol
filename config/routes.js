module.exports.routes = {
  '/wol':                              {action: 'wol'},
  '/wol/send/:mac/:ip?':               {action: 'wol/emit'},
  '/wol/host/:id':                     {action: 'wol/wake-host'},
  '/wol/group/:id':                    {action: 'wol/wake-group'}
};
