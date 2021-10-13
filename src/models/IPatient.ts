import { GenderInterface } from "./IGender";
import { AllergyInterface } from "./IAllergy";
import { Underlying_diseaseInterface } from "./IUnderlying_disease";
import { RecorderInterface } from "./IRecorder";

export interface PatientInterface{
    ID: number
    ID_CARD: string
    FIRSTNAME: string
    LASTNAME: string
    BIRTHDER: Date
    AGE: number
    GenderID: number
    Gender: GenderInterface
    AllergyID: number
    Allergy: AllergyInterface
    Underlying_diseaseID: number
    Underlying_disease:Underlying_diseaseInterface
    RecorderID: number
    Recorder: RecorderInterface
}