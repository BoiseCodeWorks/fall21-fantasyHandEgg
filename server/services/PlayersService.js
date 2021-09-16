import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class PlayersService {
  async getTeamPlayers(userData) {
    const foundPlayers = await dbContext.Players.find(userData).populate('creator', 'name picture')
    return foundPlayers
  }

  async getPlayer(playerId) {
    const player = await dbContext.Players.findById(playerId).populate('creator', 'name picture')
    if (!player) {
      throw new BadRequest('Unable to find player')
    }
    return player
  }

  async removePlayer(playerId, userId) {
    // Not as good of a method
    // const removedPlayer = await dbContext.Players.findOneAndDelete({ _id: playerId, creatorId: userId })

    // Much better way - NOW it's much moe bettah
    const foundPlayer = await this.getPlayer(playerId)
    if (foundPlayer.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your player HOMIE')
    }
    await foundPlayer.remove()
    return foundPlayer
  }

  async addPlayer(playerData) {
    const player = await dbContext.Players.create(playerData)
    // May not need to do this, but here is how it works
    await player.populate('creator', 'name picture').execPopulate()
    return player
  }
}

export const playersService = new PlayersService()
