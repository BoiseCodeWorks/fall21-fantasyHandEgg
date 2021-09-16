import { logger } from '../Utils/Logger.js'
import { ProxyState } from '../AppState.js'
import { playersService } from '../Services/PlayersService.js'
import { AuthService } from '../Services/AuthService.js'
import { toast } from '../Utils/Notification.js'

// function drawAllPlayers() {
//   let template = ''
//   console.log(ProxyState.players)
//   // eslint-disable-next-line no-return-assign
//   ProxyState.players.forEach(p => template += p.Template)
//   document.getElementById('players').innerHTML = template
// }

function _drawSearchedPlayers() {
  let template = ''
  ProxyState.searchedPlayers.forEach(p => { template += p.Template })
  document.getElementById('searchedPlayers').innerHTML = template
}

function _drawMyPlayers() {
  let template = ''
  ProxyState.myPlayers.forEach(p => { template += p.Template })
  document.getElementById('myPlayers').innerHTML = template
  document.getElementById('playerCount').innerText = ProxyState.myPlayers.length
}

export class PlayersController {
  constructor() {
    logger.log('hello from players controller')
    ProxyState.on('searchedPlayers', _drawSearchedPlayers)
    ProxyState.on('myPlayers', _drawMyPlayers)
    // AuthService.on('authenticated', this.getMyPlayers)
    ProxyState.on('account', this.getMyPlayers)
  }

  async searchPlayer() {
    try {
      // eslint-disable-next-line no-undef
      event.preventDefault()
      // eslint-disable-next-line no-undef
      const form = event.target

      await playersService.searchPlayer(form.searchTerm.value)
    } catch (error) {
      toast(error, 'error')
    }
  }

  async addPlayer(playerId) {
    try {
      logger.log('player id on add', playerId)
      const addedPlayer = await playersService.addPlayer(playerId)
      toast(`${addedPlayer.fullname} has been added to your Ballerzzz`)
    } catch (error) {
      toast(error, 'error')
    }
  }

  async getMyPlayers() {
    try {
      await playersService.getMyPlayers()
    } catch (error) {
      toast(error, 'error')
    }
  }

  async removePlayer(playerId) {
    try {
      await playersService.removePlayer(playerId)
      logger.log(playerId)
    } catch (error) {
      toast(error, 'error')
    }
  }
}
