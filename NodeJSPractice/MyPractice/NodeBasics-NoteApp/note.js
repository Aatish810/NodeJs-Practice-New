module.exports.addNumber = (a, b) => {
  return a+b;
}

module.exports.addNote = () => {
    return '25';
}

module.exports.command = () => {
  // get commands from cmd prompt
  var cmd = process.argv[2];
  
  if (cmd == 'list') {
     return 'Show List';
  } else if (cmd == 'add') {
     return 'Add to list';
  } else if (cmd == 'remove') {
     return 'Remove from List';
  } else if (cmd == 'read') {
    return 'Read from List';
  } else {
     return 'Wrong Command';
  }
}