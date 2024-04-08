import { vinayData, } from "./vinayData.js";

export class Vinay {
    constructor(வினய்ப்பெயர், இனத்துப்பெயர்,) {
        if (! வினய்ப்பெயர்) {
            return undefined;
        }

        if (இனத்துப்பெயர்) {
            const vinayinam = Array.from(vinayData.values(),).flat().find(e => e.இனத்துப்பெயர் === இனத்துப்பெயர்,);
            if (vinayinam && ! vinayinam.valid(வினய்ப்பெயர்,)) {
                throw new Error(`vinay ${வினய்ப்பெயர்} isn't valid for vinayinam ${இனத்துப்பெயர்}.`,);
            }

            this.வினயினம் = vinayinam;
            this.வினய் = this.வினயினம்.vinay(வினய்ப்பெயர்);
            return;
        }

        const vinayinam = vinayData.get(வினய்ப்பெயர்,);

        if (Array.isArray(vinayinam)) {
            const peyargal = vinayinam.map((inam) => inam.இனத்துப்பெயர்,);
            throw new Error(`Multiple vinay classes possible for ${வினய்ப்பெயர்}: ${peyargal}. Select one.`,);
        }

        this.வினயினம் = vinayData.get(வினய்ப்பெயர்,);
        this.வினய் = this.வினயினம்.vinay(வினய்ப்பெயர்);
    }
    ஏவல்வினய்வினய்முற்று() {
        return this.வினயினம்.ஏவல்வினய்வினய்முற்று(this.வினய்);
    }
    அல்வினய்முற்று() {
        return this.வினயினம்.அல்வினய்முற்று(this.வினய்);
    }
    இறந்தகாலத்துவினயெச்சம்() {
        return this.வினயினம்.இறந்தகாலத்துவினயெச்சம்(this.வினய்);
    }
    இறந்தகாலத்துப்பெயரெச்சம்() {
        return this.வினயினம்.இறந்தகாலத்துப்பெயரெச்சம்(this.வினய்);
    }
    இறந்தகாலத்துவினய்முற்று() {
        return this.வினயினம்.இறந்தகாலத்துவினய்முற்று(this.வினய்);
    }
    நிகழ்காலத்துப்பெயரெச்சம்() {
        return this.வினயினம்.நிகழ்காலத்துப்பெயரெச்சம்(this.வினய்);
    }
    நிகழ்காலத்துவினய்முற்று() {
        return this.வினயினம்.நிகழ்காலத்துவினய்முற்று(this.வினய்);
    }
    எதிர்காலத்துவினயெச்சம்() {
        return this.வினயினம்.எதிர்காலத்துவினயெச்சம்(this.வினய்);
    }
    எதிர்காலத்துப்பெயரெச்சம்() {
        return this.வினயினம்.எதிர்காலத்துப்பெயரெச்சம்(this.வினய்);
    }
    எதிர்காலத்துவினய்முற்று() {
        return this.வினயினம்.எதிர்காலத்துவினய்முற்று(this.வினய்);
    }
    தொழிற்பெயர்() {
        return this.வினயினம்.தொழிற்பெயர்(this.வினய்);
    }
}

