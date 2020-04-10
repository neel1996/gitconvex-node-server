const exec = require('child_process').exec()
const promisify = require('util').promisify()
//const os = require('os')

async function gitCommandArgs(args)
{
    const execPromised = promisify(exec)
    const primeCommand = args[0];

    const fullCommand = "git " + args[0] + " " + args.slice(0,args.length).join(" ")
    console.log(fullCommand)

    switch(primeCommand){
        case 'status':
            const commandRes = await execPromised(fullCommand)
            return commandRes.stdout;
        default:
            return "INVALID_COMMAND"
    }
}

exports.module = gitCommandArgs