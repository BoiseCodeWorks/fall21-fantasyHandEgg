
export class Player {
  constructor(data) {
    this.id = data._id
    this.firstname = data.firstname || 'N/A'
    this.lastname = data.lastname || 'N/A'
    this.fullname = data.fullname || 'N/A'
    this.age = data.age || 'N/A'
    this.position = data.position
    this.jerseyNumber = data.jersey || 'N/A'
    this.team = data.pro_team || data.team
    this.byeweek = data.bye_week || data.byeweek
    this.imgURL = data.photo || data.imgURL
    this.playerId = data.id
  }

  get Template() {
    return /* html */ `
    <div class="col-md-3 mb-1">
      <div class="card mb-3 rounded shadow">
        <div class="card-body rounded p-1">
          <div class="row pb-1">
            <div class="col-md-12">
              <i class="mdi mdi-plus-circle p-0 float-right btn text-success ${this.id ? 'visually-hidden' : ''}" onclick="app.playersController.addPlayer('${this.playerId}')"></i>
              <i class="mdi mdi-minus-circle p-0 float-right btn text-danger ${!this.id ? 'visually-hidden' : ''}" onclick="app.playersController.removePlayer('${this.id}')"></i>
            </div>
            <div class="col-md-6">
              <h6 class="card-text">${this.firstname} ${this.lastname}</h6>
              <h6 class="card-text">Pos: ${this.position}</h6>
            </div>
            <div class="col-md-6">
              <h6 class="card-text">#${this.jerseyNumber}</h6>
              <h6 class="card-text">${this.team}</h6>
            </div>
          </div>
        </div>
          <img src="${this.imgURL}" class="card-img-bottom rounded" alt="http://placehold.it/300x300">
      </div>
    </div>
    `
  }
}
