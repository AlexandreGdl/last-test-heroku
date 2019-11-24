import * as mongoose from 'mongoose'

export const PreferenceSchema = new mongoose.Schema({
    id_user: {type: String, required: true},
    num_ligne: {type: String, required: true},
    arret: {type: String, required: true},
});

export interface Preference extends mongoose.Document{
    id: string,
    id_user: string,
    num_ligne: string,
    arret: number,
}
