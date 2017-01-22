var roleClaimer = {
    run: function (creep) {
        /** @param {creep} creep */
        if (creep.room.name != Game.flags[creep.memory.claim].pos.roomName) {
            creep.moveTo(Game.flags[creep.memory.claim]);
        }
        else {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleClaimer;