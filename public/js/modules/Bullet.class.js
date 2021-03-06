import {bulletVelocity, bulletSize, colors} from './Constants.js'


export class Bullet {
	constructor({playerIND, id, position, time}) {
		this.position = { x: Number(position.x), y: Number(position.y), direction: Number(position.direction) }
		this.playerIND = playerIND
		this.id = id
		this.time = time
	}
	draw(ctx, xOffset, yOffset, cellWidth, cellheight) {
		ctx.fillStyle = colors.bullet
		ctx.beginPath()
		ctx.arc((this.position.x - xOffset)*cellWidth,(this.position.y - yOffset)*cellheight, bulletSize*3, 0, 2 * Math.PI)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
	}
	move(game) {
		const newXposition =
			this.position.x + Math.cos(this.position.direction* Math.PI / 180) * bulletVelocity
		const newYposition =
			this.position.y + Math.sin(this.position.direction* Math.PI / 180) * bulletVelocity
		if(game.isStartZone(newXposition, newYposition) || game.isEndZone(newXposition, newYposition)  ){
			const bulletIndex = game.bullets.findIndex(
				(el) => (el.id = this.id)
			)
			game.bullets.splice(bulletIndex, 1)
		}
        const player = game.isPlayer(newXposition, newYposition)
		if (!player && !game.isWall(newXposition, newYposition)) {
			this.position.x = newXposition
			this.position.y = newYposition
			setTimeout(() => {
				if (this) this.move(game)
			},10)
		} else {
			const bulletIndex = game.bullets.findIndex(
				(el) => (el.id = this.id)
			)
			game.bullets.splice(bulletIndex, 1)
		}
	}
}

