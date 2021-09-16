/* eslint-disable no-undef */
import { ProxyState } from '../AppState.js'
import { Player } from '../Models/Player.js'
import { logger } from '../Utils/Logger.js'
import { toast } from '../Utils/Notification.js'
import { api, footballApi } from './AxiosService.js'

class PlayersService {
  constructor() {
    this.getPlayers()
  }

  async getPlayers() {
    try {
      const localData = JSON.parse(localStorage.getItem('playerData'))
      if (localData) {
        ProxyState.players = localData.players.map(p => new Player(p))
      } else {
        const res = await footballApi.get('')
        localStorage.setItem('playerData', JSON.stringify({
          players: res.data.body.players
        }))
        ProxyState.players = res.data.body.map(p => new Player(p))
      }
      logger.log('Players array after localstorage', ProxyState.players)
    } catch (error) {
      logger.log(error)
    }
  }

  async searchPlayer(searchTerm) {
    logger.log(ProxyState.players)
    const reg = new RegExp(searchTerm, 'ig')

    const foundPlayers = ProxyState.players.filter(p => reg.test(p.fullname) || reg.test(p.position))
    logger.log('found players after filter', foundPlayers)

    ProxyState.searchedPlayers = foundPlayers
  }

  async addPlayer(playerId) {
    const foundPlayer = ProxyState.players.find(p => p.playerId === playerId)
    const res = await api.post('api/players', foundPlayer)
    ProxyState.myPlayers = [...ProxyState.myPlayers, new Player(res.data)]
    logger.log('ProxyState.myPlayers', ProxyState.myPlayers)
    return foundPlayer
  }

  async getMyPlayers() {
    const res = await api.get('api/players')
    ProxyState.myPlayers = res.data.map(p => new Player(p))
    logger.log('my players after get', ProxyState.myPlayers)
  }

  async removePlayer(playerId) {
    const res = await api.delete('api/players/' + playerId)
    ProxyState.myPlayers = ProxyState.myPlayers.filter(p => p.id !== playerId)
    logger.log(res)
    toast(`${res.data.fullname} has been removed`)
  }
}

export const playersService = new PlayersService()
