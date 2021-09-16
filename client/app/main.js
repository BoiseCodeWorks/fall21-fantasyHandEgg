import { AuthController } from './Controllers/AuthController.js'
import { PlayersController } from './Controllers/PlayersController.js'
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  playersController = new PlayersController()
}

// @ts-ignore
window.app = new App()
