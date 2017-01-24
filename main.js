require('creeps');
require('spawns');
require('torri');

module.exports.loop = function () {
    //nontiscordardime
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    var torri = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let torre of torri) {
            torre.Spara();
    }
    // link
    var linkA = Game.getObjectById('104d7d66a279304');
    var linkB = Game.spawns['Spawn1'].pos.findInRange(FIND_MY_STRUCTURES, 3,
        { filter: { structureType: STRUCTURE_LINK } })[0];
    if (linkA.energy > 740) {
        linkA.transferEnergy(linkB);
    }
    for (let name in Game.creeps) {
        Game.creeps[name].FaiIlTuoLavoro();  //bravi creeps
    }
    for (let NomeSpawn in Game.spawns) {
        Game.spawns[NomeSpawn].CreaCreepRichiesto();
    }
}