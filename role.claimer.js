var roleClaimer = {
    run: function (creep) {
        /** @param {creep} creep */
        if (creep.memory.stanza != creep.pos.roomName && creep.memory.stanza != undefined) {
            var Uscita = creep.room.findExitTo(creep.memory.stanza);
            creep.moveTo(creep.pos.findClosestByRange(Uscita));
        }
        else {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleClaimer;