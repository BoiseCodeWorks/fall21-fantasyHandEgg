import { Auth0Provider } from '@bcwdev/auth0provider'
import { playersService } from '../services/PlayersService.js'
import BaseController from '../utils/BaseController.js'
export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getTeamPlayers)
      .get('/:id', this.getPlayer)
      .delete('/:id', this.removePlayer)
      .post('', this.addPlayer)
  }

  async getTeamPlayers(req, res, next) {
    try {
      const foundPlayers = await playersService.getTeamPlayers({ creatorId: req.userInfo.id })
      res.send(foundPlayers)
    } catch (error) {
      next(error)
    }
  }

  async getPlayer(req, res, next) {
    try {
      const player = await playersService.getPlayer(req.params.id)
      res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async removePlayer(req, res, next) {
    try {
      const removedPlayer = await playersService.removePlayer(req.params.id, req.userInfo.id)
      res.send(removedPlayer)
    } catch (error) {
      next(error)
    }
  }

  async addPlayer(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const addedPlayer = await playersService.addPlayer(req.body)
      res.send(addedPlayer)
    } catch (error) {
      next(error)
    }
  }
}
