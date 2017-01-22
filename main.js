require('creacorpo')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMuratore = require('role.muratore');
var roleLadro = require('role.ladro');
var roleClaimer = require('role.claimer');

module.exports.loop = function () {
    //nontiscordardime
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'muratore') {
            roleMuratore.run(creep);
        }
        if (creep.memory.role == 'ladro') {
            roleLadro.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var muratori = _.filter(Game.creeps, (creep) => creep.memory.role == 'muratore');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var ladri1 = _.filter(Game.creeps, (creep) => (creep.memory.role == 'ladro' && creep.memory.ruba == 'Ruba1'));
    var ladri2 = _.filter(Game.creeps, (creep) => (creep.memory.role == 'ladro' && creep.memory.ruba == 'Ruba2'));
    var BandieraRossa = _.filter(Game.flags, (flag) => flag.color == COLOR_RED);
    var energiamax = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    if (harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'harvester');
        if (newName == ERR_NOT_ENOUGH_ENERGY && harvesters == 0) {
            var newName = Game.spawns['Spawn1'].CreaCorpo(Game.spawns.Spawn1.room.energyAvailable, 'harvester');   //antiwipe
        }
    }
    else if (BandieraRossa.length > 0 && claimers.length < 1){
        var newName = Game.spawns['Spawn1'].CreaClaimer(BandieraRossa[0].name);    //fondare
    }
    else if (builders.length < 1) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'builder');
    }
    else if (repairers.length < 1) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'repairer');
    }
    else if (muratori.length < 1) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'muratore');
    }
    else if (ladri1.length < 1) {
        var newName = Game.spawns['Spawn1'].CreaLadro(energiamax, 'Casa1', 'Ruba1');
    }
    else if (ladri2.length < 1) {
        var newName = Game.spawns['Spawn1'].CreaLadro(energiamax, 'Casa1', 'Ruba2');
    }
    else {
        if (Game.rooms[Game.spawns['Spawn1'].pos.roomName].controller.level < 4) {
            var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'upgrader');
        }
        else {
            if (upgraders.length < 2) {
                var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'upgrader');
            }
        }
    }
    if (!(newName < 0) && newName != undefined) {
        console.log('Partorito un '+ Game.creeps[newName].memory.role +': ' + newName);
    }
}