const sendMessage = require('./send')
const deleteMessage = require('./delete')
const loadMessage = require('./load')

async function index(req, res) {
  console.log('bura gelid')
  const { action } = req.body

  switch (action.type) {
    case 'send':
      sendMessage(req,res)
      break;
    case 'delete' : 
      deleteMessage(req,res)
      break;
    case 'load' :
      loadMessage(req,res)
      break;  
  }


}

module.exports = index