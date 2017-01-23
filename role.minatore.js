var roleMinatore = {
    run: function (creep) {
        /** @param {creep} creep */
        if (creep.carry.energy < creep.carryCapacity) {
            var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
            if (energy.length) {
                creep.pickup(energy[0]);
            }
        }
        if (creep.memory.lavora && creep.carry.energy == 0) {
            creep.memory.lavora = false;
        }
        if (!creep.memory.lavora && creep.carry.energy == creep.carryCapacity) {
            creep.memory.lavora = true;
        }
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.lavora) {
            //var source = creep.pos.findClosestByPath(Game.getObjectById(creep.memory.source));
            var source = Game.getObjectById(creep.memory.source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_LINK  && structure.energy < structure.energyCapacity;
                }
            });
            if (target != undefined) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }         
        }
    }
};

module.exports = roleMinatore;