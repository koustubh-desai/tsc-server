var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ResolveLater() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(' STEP 1 ');
        const la1 = yield tryme('wallah');
        console.log(' STEP 2 ', la1);
        const la2 = yield tryme(la1 + 'jojo');
        console.log(' STEP 3 ', la2);
        const la3 = yield tryme(la2 + 'koko');
        return 'i am done' + la3;
    });
}
function tryme(mssg) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('\n resolving', mssg);
            resolve(mssg);
        }, Math.random() * 2000);
    });
}
console.log('started \n');
console.log(ResolveLater());
