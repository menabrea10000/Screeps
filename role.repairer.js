var roleUpgrader = require('role.upgrader');
var roleRepairer = {
    run: function(creep) {

        if(creep.memory.repairer && creep.carry.energy == 0) {
            creep.memory.repairer = false;
            creep.say('succhio');
        }
        if(!creep.memory.repairer && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairer = true;
            creep.say('costruisco');
        }

        if(creep.memory.repairer) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(targets != undefined) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleRepairer;