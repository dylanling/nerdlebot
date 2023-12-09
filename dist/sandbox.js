// const fs = require("fs/promises");
// const util = require("util");
// const exec = util.promisify(require("child_process").exec);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { recommendations } from "./nerdle";
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let battle = { movies: [], links: {} };
        const getRecs = recommendations(battle);
        const movie = { name: "Pulp Fiction", year: "1994" };
        const rec = getRecs(movie);
        console.log(rec);
    });
}
//# sourceMappingURL=sandbox.js.map