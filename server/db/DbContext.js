import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { PlayerSchema } from '../models/Player'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Players = mongoose.model('Player', PlayerSchema)
}

export const dbContext = new DbContext()
