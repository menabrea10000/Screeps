var roleMinatore = {
    run: function (creep) {
        /** @param {creep} creep */
        if (creep.memory.stanza != creep.pos.roomName && creep.memory.stanza != undefined) {
            var Uscita = creep.room.findExitTo(creep.memory.stanza);
            creep.moveTo(creep.pos.findClosestByRange(Uscita));
        }
        else {
            var source = Game.getObjectById(creep.memory.source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);             
            }
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            if (container.pos != creep.pos) {
               creep.moveTo(container);
            }
        }
    }
};

module.exports = roleMinatore;