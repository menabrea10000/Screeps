require('creacorpo')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


module.exports.loop = function () {
	
    //nontiscordardime
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
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
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    var energiamax = Game.spawns['Spawn1'].room.energyCapacityAvailable;

    /*if (harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].creaCorpo(energiamax,'harvester');
        console.log('Spawning new harvester: ' + newName);
    }*/
    if (builders.length < 2) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'builder');
    }
    else if (harvesters.length < 6) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax,'harvester');
        if (newName == ERR_NOT_ENOUGH_ENERGY && harvesters == 0) {
            var newName = Game.spawns['Spawn1'].CreaCorpo(Game.spawns.Spawn1.room.energyAvailable, 'harvester');   //antiwipe
        }
    }
    else if (repairers.length < 2) {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'repairer');
    }
    else {
        var newName = Game.spawns['Spawn1'].CreaCorpo(energiamax, 'upgrader'); 
    }
    if (!(newName < 0)) {
        console.log('Partorito un '+ Game.creeps[newName].memory.role +': ' + newName);
    }
}