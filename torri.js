StructureTower.prototype.Spara = function () {
    var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target != undefined) {
        this.attack(target);    //aggiungo condizioni se no è un TD
    }
}