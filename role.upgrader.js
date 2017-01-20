var roleUpgrader = {
    run: function(creep) {

        if(creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
            creep.say('raccolgo');
        }
        if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
            creep.say('SALIII');
        }

        if (creep.memory.lavora) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
    }
};

module.exports = roleUpgrader;